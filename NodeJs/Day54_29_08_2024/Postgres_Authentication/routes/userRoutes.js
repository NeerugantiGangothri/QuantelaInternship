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

// createTable=` CREATE TABLE IF NOT EXISTS employee (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(100) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(100) UNIQUE NOT NULL,
//     role VARCHAR(100) NOT NULL
//   );
// `;

// pool.query(createTable,(err,res)=>{
//   if(!err){
//     console.log('Table created');
//   }
// });


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


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM employee WHERE email = $1', [email]);
    
    if (result.rows.length > 0) {
      const emp = result.rows[0];
      const isMatch = await bcrypt.compare(password, emp.password);
      
      if (isMatch) {
        req.session.empId = emp.id;
        req.session.empRole = emp.role;
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


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/employee/login');
});

router.get('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employee ORDER BY id ASC');
    res.render('employee', { employee: result.rows });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

router.get('/edit/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const empId = req.params.id;
  
  try {
    const result = await pool.query('SELECT * FROM employee WHERE id = $1', [empId]);
    if (result.rows.length > 0) {
      res.render('edit', { emp: result.rows[0] });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const empId = req.params.id;
  const { username, email, role } = req.body;
  
  try{
    await pool.query('UPDATE employee SET username = $1, email = $2, role = $3 WHERE id = $4', [username, email, role, empId]);
    res.redirect('/employee');
  } 
  catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

router.post('/delete/:id',ensureAuthenticated,ensureAdmin, async(req,res)=>{
  const empId=req.params.id;
  try{
    const result = await pool.query('DELETE FROM employee where id=$1',[empId]);
   res.redirect('/employee');
  }
  catch(err){
    console.error("Error Excuting query",err.stack);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
