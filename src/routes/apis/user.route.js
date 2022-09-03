const express = require('express');
const router = express.Router();
const userController = require('../../controllers/apis/user.controller');
const { verifyToken, verifyTokenAndAuthorization } = require('../../middleware/verifyToken')
router.get('/:id', verifyToken, userController.getUser);

module.exports = router;