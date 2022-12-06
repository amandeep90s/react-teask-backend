const express = require('express');
const AppError = require('./utils/appError');
const userRouter = require('./routes/users');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Middleware
app.use(express.json());

// Router mounting
app.use('/api/v1', userRouter);

// Handling unhandled errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't handle ${req.originalUrl} in this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
