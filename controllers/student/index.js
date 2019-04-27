const router = require('express').Router();
const studentController = require('./student.controller');

router.patch('/update',studentController.updateStudentDetails);


module.exports = router;