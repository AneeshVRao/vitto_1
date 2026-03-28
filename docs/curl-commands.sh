#!/bin/bash
# ────────────────────────────────────────────────────────────
# Vitto API — curl test commands
# Run these in order. Copy the token from step 2, lead id from step 3.
# ────────────────────────────────────────────────────────────

BASE="http://localhost:4000"

# ── 0. Health check ──────────────────────────────────────────
curl -s "$BASE/health" | python3 -m json.tool

# ── 1. Send OTP (email) ──────────────────────────────────────
curl -s -X POST "$BASE/api/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d '{"email": "cro@yourbank.com"}' \
  | python3 -m json.tool

# ── 1b. Send OTP (phone) ─────────────────────────────────────
curl -s -X POST "$BASE/api/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}' \
  | python3 -m json.tool

# ── 2. Verify OTP ────────────────────────────────────────────
# Replace OTP_FROM_CONSOLE with the 6-digit code printed in server logs
TOKEN=$(curl -s -X POST "$BASE/api/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{"email": "cro@yourbank.com", "otp": "OTP_FROM_CONSOLE"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

echo "JWT Token: $TOKEN"

# ── 3. Create lead ───────────────────────────────────────────
LEAD_ID=$(curl -s -X POST "$BASE/api/leads" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "institution_name": "Finova Capital Pvt. Ltd.",
    "institution_type": "NBFC",
    "city": "Mumbai",
    "loan_book_size": "₹200–500 Cr",
    "email": "cro@yourbank.com"
  }' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['id'])")

echo "Lead ID: $LEAD_ID"

# ── 4. Get lead by ID ────────────────────────────────────────
curl -s "$BASE/api/leads/$LEAD_ID" \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool

# ── Error cases ──────────────────────────────────────────────

# Missing token → 401
curl -s -X POST "$BASE/api/leads" \
  -H "Content-Type: application/json" \
  -d '{"institution_name": "Test"}' \
  | python3 -m json.tool

# Invalid email → 400
curl -s -X POST "$BASE/api/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d '{"email": "not-an-email"}' \
  | python3 -m json.tool

# Wrong OTP → 400
curl -s -X POST "$BASE/api/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{"email": "cro@yourbank.com", "otp": "000000"}' \
  | python3 -m json.tool
