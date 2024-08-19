const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gangothri@90',
 // database: 'mydb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  else{
    console.log('Connected to MySQL');
  }

  connection.query("CREATE DATABASE db1", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

});

module.exports = connection;