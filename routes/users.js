const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();
// Signup route
router.post('/signup', signup);
// Login route
router.post('/login', login);
// TODO logout route
// TODO Dasboard route

module.exports = router;
