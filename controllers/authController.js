const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create token method
const signToken = (userId, colorPreference) =>
  jwt.sign(
    { id: userId, themeColor: colorPreference },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

// Signup user method
const signup = catchAsync(async (req, res, next) => {
  // Destructuring request bdy
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  const token = signToken(newUser._id, newUser.colorPreference);
  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

// Login user method
const login = catchAsync(async (req, res, next) => {
  // Destructuring request bdy
  const { email, password } = req.body;
  // Check email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // Check if user is existed and password is correct
  const user = await User.findOne({ email }).select('+password');
  const validPassword = await user.correctPassword(password, user.password);
  if (!user || !validPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // If everything ok, send token to client
  const token = signToken(user._id, user.colorPreference);
  res.status(200).json({ status: 'success', token });
});

// Logout user method
const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// Dashboard user method
const dashboard = (req, res, next) => {
  res.status(200).json({ status: 'success' });
};

// Update user method
const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({ status: 'success' });
});

module.exports = { dashboard, login, logout, signup, updateUser };
