const router = require('express').Router();
const facultyController = require('./faculty.controller');

router.patch('/update',facultyController.updateFacultyDetails)

module.exports = router;