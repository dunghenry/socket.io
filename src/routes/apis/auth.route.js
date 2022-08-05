const express = require('express');
const router = express.Router();
const authController = require('../../controllers/apis/auth.controller');
router.post('/register', authController.register);
module.exports = router;