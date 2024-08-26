const express = require('express');
const router = express.Router();
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'Gangothri@90',
  port: 5432,
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users order by id asc');
    res.render('users', { users: result.rows });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

router.get('/details', (req, res) => {
    res.render('details');
  });

router.post('/details', async (req, res) => {
    const { username, email } = req.body;
    
    try {
      await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email]);
      res.redirect('/users');
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Server Error');
    }
  });


router.get('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (result.rows.length > 0) {
        res.render('edit', { user: result.rows[0] });
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Server Error');
    }
  });

  router.post('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;
    try {
      await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, userId]);
      res.redirect('/users');
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Server Error');
    }
  });

  router.post('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
      if (result.rowCount > 0) {
        res.redirect('/users');
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
