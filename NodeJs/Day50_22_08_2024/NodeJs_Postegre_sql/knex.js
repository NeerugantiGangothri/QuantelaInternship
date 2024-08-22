const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',                  
        user: 'postgres',    
        password: 'Gangothri@90',
        database: 'demo'
    }
  });
  
  // Example query using knex
  knex('users')
    .select('*')
    .then(rows => console.log('User data:', rows))
    .catch(err => console.error('Error executing query', err))
    .finally(() => knex.destroy()); // Close the connection when done
  