const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('../src/app');

// Export the Express app as a serverless function
module.exports = app;
