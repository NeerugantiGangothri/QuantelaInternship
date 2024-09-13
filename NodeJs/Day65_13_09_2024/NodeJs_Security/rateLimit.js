const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Create a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true, 
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('Welcome! You are rate limited.');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
