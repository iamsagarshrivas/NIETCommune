const express = require('express');
const router = express.Router();

// Changed routes config
const userRoutes = require('./user/index');
const studentRoutes = require('./student/index');
router.use('/user', userRoutes);
router.use('/student',studentRoutes)

module.exports = router;