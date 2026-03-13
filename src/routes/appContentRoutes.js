const express = require('express');
const appContentController = require('../controllers/appContentController');

const router = express.Router();

router.get('/api/app-content', appContentController.getAppContent);
router.put('/api/app-content', appContentController.updateAppContent);

module.exports = router;
