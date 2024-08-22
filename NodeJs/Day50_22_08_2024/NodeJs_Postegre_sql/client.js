const { Client } = require('pg');

const client = new Client({
  host: 'localhost',       
  port: 5432,               
  user: 'postgres',    
  password: 'Gangothri@90',
  database: 'demo' 
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Example query to check connection
client.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('User data:', res.rows);
    }
    
    client.end();
  });
  