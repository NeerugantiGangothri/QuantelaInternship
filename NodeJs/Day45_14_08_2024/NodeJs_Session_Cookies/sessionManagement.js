const express = require('express');
const session = require('express-session');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'superSecretKey', // Secret key to sign the session ID cookie
  resave: false, // Don't save session if it hasn't changed
  saveUninitialized: false, // Don't create a session until something is stored in it
  cookie: { secure: false } // Set to true for HTTPS
}));

// Middleware to protect routes
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware/route
  } else {
    res.status(401).send('You need to log in to access this page.');
  }
}

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the public home page!');
});

// Simulate login and create a session
app.get('/login', (req, res) => {
  req.session.user = { username: 'JohnDoe' }; // Store user data in session
  res.send('User logged in');
});

// Simulate logout by destroying the session
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.send('User logged out');
});

// Protected route - requires user to be logged in
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome to your dashboard, ${req.session.user.username}!`);
});

// Another protected route
app.get('/settings', authMiddleware, (req, res) => {
  res.send('Accessing account settings...');
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
