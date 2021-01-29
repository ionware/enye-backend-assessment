require('dotenv').config();
const http = require('http');
const app = require('./src/app');

// create an HTTP server for the Express app.
const server = http.createServer(app);

// Grab the PORT number from environment vairable (my eyes on Heroku)
const PORT = process.env.PORT || 8080;

// Start the server
server.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production')
    // eslint-disable-next-line no-console
    console.info(`Server started on http://localhost:${PORT}`);
});
