const express = require('express');
const router = express.Router();

// Changed routes config
const userRoutes = require('./user/index');
const studentRoutes = require('./student/index');
const facultyRoutes = require('./faculty/index');

router.use('/user', userRoutes);
router.use('/student',studentRoutes);
router.use('/faculty',facultyRoutes);

module.exports = router;