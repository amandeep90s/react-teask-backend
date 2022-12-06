const express = require('express');
const {
  dashboard,
  login,
  logout,
  signup,
  updateUser,
} = require('../controllers/authController');

const router = express.Router();
// Signup route
router.post('/signup', signup);
// Login route
router.post('/login', login);
// Logout route
router.get('/logout', logout);
// Dashboard route
router.get('/dashboard', dashboard);
// Update user route
router.patch('/users/:id', updateUser);

module.exports = router;
