const router = require('express').Router();
const timetableController = require('./timetable.controller');

router.get('/student/:id',timetableController.getClassTimetable);
router.get('/student/day',timetableController.getClassTimetableByDay);


module.exports = router;