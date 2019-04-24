const express = require('express');
const router = express.Router();

// Changed routes config
const userRoutes = require('./user/index');
router.use('/user', userRoutes);

module.exports = router;