const router = require('express').Router();
const studentController = require('./student.controller');

router.post('/add-class',studentController.addClass);
router.get('/notice-count/:id',studentController.getNotificationCount);
router.get('/notices/:id',studentController.getMyNotifications);

module.exports = router;