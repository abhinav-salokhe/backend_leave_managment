const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupHr);
router.post('/signin', authController.signinHr);


module.exports = router;
