const express = require('express');
const connection = require('./connection');

const app = express();
const port = 3000;

app.use(express.json());

// Get all employees
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new employee
app.post('/employees', (req, res) => {
  const { name, position, salary } = req.body;
  connection.query('INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)', [name, position, salary], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
