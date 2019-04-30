const router = require('express').Router();
const timetableController = require('./timetable.controller');

router.get('/student',timetableController.getClassTimetable);

module.exports = router;