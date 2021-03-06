const express = require('express');
const router = express.Router();

// Changed routes config
const userController = require('./user.controller');
router.get('/', userController.getAllUser);
router.get('/another',userController.getAnotherUser);
router.post('/login',userController.authenticateUser);
router.post('/register-user',userController.registerUser);
router.post('/update-user',userController.updateUser);
router.patch('/register-user',userController.updateUser);

module.exports = router;