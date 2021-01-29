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

module.exports = app;
