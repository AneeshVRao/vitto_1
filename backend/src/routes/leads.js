const express = require('express');
const jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const { pool } = require('../db/postgres');

const router = express.Router();

// ─── Auth middleware ──────────────────────────────────────────────────────────

function requireAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    if (payload.scope !== 'lead:create') {
      return res.status(403).json({ error: 'Token does not have lead:create scope' });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────
/**
 * Creates a new lead record in PostgreSQL.
 * Requires a valid JWT from /api/auth/verify-otp
 *
 * @body {
 *   institution_name: string,
 *   institution_type: 'Bank' | 'NBFC' | 'MFI' | 'HFC' | 'Fintech Lender',
 *   city: string,
 *   loan_book_size: string,
 *   email?: string,
 *   phone?: string
 * }
 */
router.post(
  '/',
  requireAuth,
  [
    body('institution_name').trim().notEmpty().withMessage('Institution name is required').isLength({ max: 255 }),
    body('institution_type').isIn(['Bank', 'NBFC', 'MFI', 'HFC', 'Fintech Lender']).withMessage('Invalid institution type'),
    body('city').trim().notEmpty().withMessage('City is required').isLength({ max: 100 }),
    body('loan_book_size').trim().notEmpty().withMessage('Loan book size is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { institution_name, institution_type, city, loan_book_size, email, phone } = req.body;

    // Use the verified identifier from JWT as the contact if not explicitly provided
    const contactEmail = email || (req.user.identifierType === 'email' ? req.user.identifier : null);
    const contactPhone = phone || (req.user.identifierType === 'phone' ? req.user.identifier : null);

    try {
      const result = await pool.query(
        `INSERT INTO leads
          (email, phone, institution_name, institution_type, city, loan_book_size, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, institution_name, status, created_at`,
        [contactEmail, contactPhone, institution_name, institution_type, city, loan_book_size, 'new']
      );

      const lead = result.rows[0];
      console.log(`[leads] New lead created: #${lead.id} — ${institution_name}`);

      return res.status(201).json({
        id: lead.id,
        institution_name: lead.institution_name,
        status: lead.status,
        created_at: lead.created_at,
        message: 'Lead submitted. Our team will reach out within 24 hours.',
      });
    } catch (err) {
      console.error('[leads POST]', err);
      return res.status(500).json({ error: 'Failed to save lead. Please try again.' });
    }
  }
);

// ─── GET /api/leads/:id ───────────────────────────────────────────────────────
/**
 * Retrieves a single lead record by ID.
 * In production, add role-based auth — only internal ops should access this.
 */
router.get(
  '/:id',
  requireAuth,
  [param('id').isInt({ min: 1 }).withMessage('Invalid lead ID')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const result = await pool.query(
        `SELECT id, email, phone, institution_name, institution_type, city, loan_book_size, status, created_at
         FROM leads WHERE id = $1`,
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      return res.json(result.rows[0]);
    } catch (err) {
      console.error('[leads GET]', err);
      return res.status(500).json({ error: 'Failed to retrieve lead' });
    }
  }
);

module.exports = router;
