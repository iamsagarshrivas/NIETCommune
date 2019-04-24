const express = require('express');
const router = express.Router();

// Changed routes config
const userController = require('./user.controller');
router.get('/', userController.getAllUser);

module.exports = router;