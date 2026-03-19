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
    process.exit(1);
  }
}

startServer();
