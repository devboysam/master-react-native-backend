const express = require('express');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.get('/api/lesson/:id', lessonController.getLessonById);
router.get('/api/lessons/:id', lessonController.getLessonById);
router.post('/api/lessons', lessonController.createLesson);
router.put('/api/lessons/:id', lessonController.updateLesson);
router.delete('/api/lessons/:id', lessonController.deleteLesson);

// Backward-compatible routes kept for existing clients.
router.post('/lessons', lessonController.createLesson);
router.put('/lessons/:id', lessonController.updateLesson);
router.delete('/lessons/:id', lessonController.deleteLesson);

module.exports = router;
