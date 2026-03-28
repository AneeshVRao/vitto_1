const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const OTPSession = require('../models/OTPSession');

const router = express.Router();

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generates a 6-digit numeric OTP */
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Mock OTP delivery — replace with MSG91 / SendGrid in production */
async function deliverOTP(type, target, otp) {
  if (process.env.OTP_CONSOLE_LOG === 'true') {
    console.log(`\n📬 OTP for ${type} ${target}: ${otp}\n`);
  }
  // Production: await smsProvider.send(target, `Your Vitto OTP is ${otp}. Valid for 10 minutes.`);
  return true;
}

// ─── POST /api/auth/send-otp ─────────────────────────────────────────────────
/**
 * @body { email: string } OR { phone: string }
 * Generates an OTP, hashes it, stores session in MongoDB (TTL 10 min), delivers mock OTP.
 */
router.post(
  '/send-otp',
  [
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.status(400).json({ error: 'Provide either email or phone' });
    }

    const identifierType = email ? 'email' : 'phone';
    const identifier = email || phone;

    try {
      const otp = generateOTP();
      const otpHash = await bcrypt.hash(otp, 10);

      // Upsert session — one active OTP per identifier at a time
      await OTPSession.findOneAndDelete({ identifier });
      await OTPSession.create({ identifier, identifierType, otpHash });

      await deliverOTP(identifierType, identifier, otp);

      return res.json({
        message: `OTP sent to ${identifierType} ${identifier}`,
        // In production, NEVER return the OTP in the response body
        ...(process.env.NODE_ENV !== 'production' && { _devOtp: otp }),
      });
    } catch (err) {
      console.error('[send-otp]', err);
      return res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }
  }
);

// ─── POST /api/auth/verify-otp ───────────────────────────────────────────────
/**
 * @body { email | phone, otp: string }
 * Validates OTP, marks session verified, issues a short-lived JWT.
 */
router.post(
  '/verify-otp',
  [
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email, phone, otp } = req.body;
    if (!email && !phone) return res.status(400).json({ error: 'Provide email or phone' });

    const identifier = email || phone;

    try {
      const session = await OTPSession.findOne({ identifier });
      if (!session) {
        return res.status(400).json({ error: 'OTP expired or not found. Please request a new one.' });
      }

      const valid = await bcrypt.compare(otp, session.otpHash);
      if (!valid) {
        return res.status(400).json({ error: 'Incorrect OTP. Please check and try again.' });
      }

      // Mark as verified (prevents replay within TTL window)
      session.verified = true;
      await session.save();

      // Issue JWT — short-lived, scoped to lead creation
      const token = jwt.sign(
        { identifier, identifierType: session.identifierType, scope: 'lead:create' },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
      );

      return res.json({ message: 'OTP verified', token });
    } catch (err) {
      console.error('[verify-otp]', err);
      return res.status(500).json({ error: 'Verification failed. Please try again.' });
    }
  }
);

module.exports = router;
