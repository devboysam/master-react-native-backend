const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use(moduleRoutes);
app.use(lessonRoutes);

app.use(errorHandler);

module.exports = app;
