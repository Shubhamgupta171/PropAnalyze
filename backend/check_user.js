const db = require('./src/config/db');

async function checkUser() {
  try {
    const email = 'agent@test.com';
    const { rows } = await db.query('SELECT id, email, role FROM users WHERE email = $1', [email]);
    console.log('User check result:', rows);
    process.exit(0);
  } catch (error) {
    console.error('Error checking user:', error);
    process.exit(1);
  }
}

checkUser();
