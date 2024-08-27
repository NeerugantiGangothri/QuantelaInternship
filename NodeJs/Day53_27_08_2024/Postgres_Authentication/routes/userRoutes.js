const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'Gangothri@90',
  port: 5432,
});

// Sign Up Route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await pool.query('INSERT INTO employee (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, role || 'user']);
    res.redirect('/employee/login');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

// Login Route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM employee WHERE email = $1', [email]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
        req.session.userId = user.id;
        req.session.userRole = user.role;
        res.redirect('/employee');
      } else {
        res.status(400).send('Invalid credentials');
      }
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/employee/login');
});

// List employee (Admin Only)
router.get('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employee ORDER BY id ASC');
    res.render('employee', { employee: result.rows });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
