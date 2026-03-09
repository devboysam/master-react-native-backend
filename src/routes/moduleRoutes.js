const express = require('express');
const moduleController = require('../controllers/moduleController');

const router = express.Router();

router.get('/api/modules', moduleController.getModules);
router.get('/api/modules/:id/lessons', moduleController.getModuleLessons);
router.post('/api/modules', moduleController.createModule);

// Backward-compatible route kept for existing clients.
router.post('/modules', moduleController.createModule);

module.exports = router;
