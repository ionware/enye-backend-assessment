const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Setup all necessary middlewares.
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ text: 'Enye Backend Assessment' }));

module.exports = app;
