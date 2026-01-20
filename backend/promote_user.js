const db = require('./src/config/db');

async function promoteUser() {
  try {
    const email = 'agent@test.com';
    const { rows } = await db.query('UPDATE users SET role = $1 WHERE email = $2 RETURNING *', ['agent', email]);
    if (rows.length > 0) {
      console.log('User promoted successfully:', rows[0].email, 'New Role:', rows[0].role);
    } else {
      console.log('User not found');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error Promoting user:', error);
    process.exit(1);
  }
}

promoteUser();
