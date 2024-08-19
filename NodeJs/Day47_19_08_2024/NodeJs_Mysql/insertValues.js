var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gangothri@90",
  database: "db1"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO employees (name, address) VALUES ?";
  var values = [
    ['Alice','Banglore'],
    ['Bob','Chennai'],
    ['Charlie','Delhi'],
    ['David','Mumbai']
  ];
  connection.query(sql,[values], function (err, result) {
    if (err) throw err;
    console.log(" Records inserted");
  });
});