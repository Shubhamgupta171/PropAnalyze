const fs = require('fs');
const path = require('path');
const db = require('./src/config/db');

const setupDatabase = async () => {
  try {
    const schemaFile = path.join(__dirname, 'src', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaFile, 'utf8');

    console.log('Running schema.sql...');
    await db.query(schema);
    console.log('Database tables created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up database:', err);
    process.exit(1);
  }
};

setupDatabase();
