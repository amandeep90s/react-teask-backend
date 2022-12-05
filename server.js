const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception 💥 Shutting down!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/.env` });

const app = require('./app');

// Connecting to db
mongoose.connect(process.env.DATABASE_URI || '').catch((error) => {
  throw error;
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port);

// Handling un-handle rejection error
process.on('unhandledRejection', (err) => {
  console.log('UnHandler rejectionI 💥 Shutting down!');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
