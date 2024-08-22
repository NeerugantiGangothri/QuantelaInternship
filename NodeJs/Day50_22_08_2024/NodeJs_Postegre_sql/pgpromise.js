const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',       
    port: 5432,               
    user: 'postgres',    
    password: 'Gangothri@90',
    database: 'demo'
});

// Example query using pg-promise
db.any('SELECT * FROM users')
  .then(data => console.log('User data:', data))
  .catch(error => console.error('Error executing query', error));
