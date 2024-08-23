const { Client } = require('pg');

const client = new Client({
  host: 'localhost',       
  port: 5432,               
  user: 'postgres',    
  password: 'Gangothri@90',
  database: 'demo' 
});


client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS demoTable (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;


client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error('Error creating table', err.stack);
  } else {
    console.log('Table created successfully');
  }
  

  client.end();
});
