const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Run on startup — creates the leads table if it doesn't exist.
 * In a real project, use a migration tool (Flyway, db-migrate, Prisma).
 */
async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id            SERIAL PRIMARY KEY,
        email         VARCHAR(255),
        phone         VARCHAR(30),
        institution_name  VARCHAR(255) NOT NULL,
        institution_type  VARCHAR(50) NOT NULL,
        city          VARCHAR(100) NOT NULL,
        loan_book_size    VARCHAR(50) NOT NULL,
        status        VARCHAR(20) NOT NULL DEFAULT 'new',
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('[postgres] Migrations applied');
  } finally {
    client.release();
  }
}

module.exports = { pool, migrate };
