const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const users = []; // Mock user database
const secretKey = 'your_secret_key'; // This should be in an environment variable

// Middleware to verify JWT and attach user data to request
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware for role-based authorization
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
}

// Register a new user
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, role };
    users.push(user);
    res.status(201).send('User registered');
});

// Login to get JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username, role: user.role }, secretKey);
    res.json({ token });
});

// Protected route, only accessible with valid JWT
app.get('/dashboard', authenticateToken, (req, res) => {
    res.send('Welcome to the dashboard!');
});

// Admin-only route
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.send('Welcome to the admin area!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
