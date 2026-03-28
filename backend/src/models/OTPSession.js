const mongoose = require('mongoose');

const OTPSessionSchema = new mongoose.Schema(
  {
    // identifier — email or phone (hashed in production, stored plain here for clarity)
    identifier: { type: String, required: true, index: true },
    identifierType: { type: String, enum: ['email', 'phone'], required: true },

    // OTP is stored hashed (bcrypt). In production, never store plain.
    otpHash: { type: String, required: true },

    // verified flag — set to true after successful OTP check
    verified: { type: Boolean, default: false },

    // TTL: MongoDB will automatically delete documents 10 minutes after createdAt
    createdAt: { type: Date, default: Date.now, expires: 60 * 10 },
  },
  { versionKey: false }
);

module.exports = mongoose.model('OTPSession', OTPSessionSchema);
