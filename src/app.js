const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

// Setup all necessary middlewares.
app.use(helmet());
app.use(cors());
app.use(express.json());

// Namespace all routes on 'api'
app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log the error to sentry or anything.
  res.status(500).json({
    error: 'Server cannot process your request.',
  });
});

module.exports = app;
