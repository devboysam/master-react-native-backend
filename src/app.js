const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const appContentRoutes = require('./routes/appContentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const allowedOrigins = [
  'https://coolsam.xyz',
  'https://www.coolsam.xyz',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use(moduleRoutes);
app.use(lessonRoutes);
app.use(appContentRoutes);

app.use(errorHandler);

module.exports = app;
