const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Use POSTGRES_URL (Vercel standard) or fall back to DATABASE_URL (Local)
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('PostgreSQL Pool Connected');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
