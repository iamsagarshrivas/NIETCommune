const express = require('express');
const router = express.Router();

// Changed routes config
const apiRoutes = require('./../controllers/index');
router.use('/api', apiRoutes);

module.exports = router;