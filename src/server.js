require('dotenv').config();
const app = require('./app');
const initializeDatabase = require('./config/initializeDatabase');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database schema', error);
    if (error && error.code === 'ETIMEDOUT') {
      console.error(
        'Database connection timed out. Check DB_HOST/DB_PORT, firewall allowlist, and DB_SSL settings in backend-api/.env.'
      );
    }
    process.exit(1);
  }
}

startServer();
