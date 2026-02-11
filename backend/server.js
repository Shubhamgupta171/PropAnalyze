const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const { pool } = require('./src/config/db');

const app = require('./src/app');

// Test Database Connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL Connection Error 💥:', err);
  } else {
    console.log('PostgreSQL Connected Successfully ✅');
  }
});

const port = process.env.PORT || 5000;

if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}

module.exports = app;

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
