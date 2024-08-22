const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',       
    port: 5432,               
    user: 'postgres',    
    password: 'Gangothri@90',
    database: 'demo'
});

// Example query using the pool
pool.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('User data:', res.rows);
  }

  // Close all connections in the pool when done
  pool.end();
});
