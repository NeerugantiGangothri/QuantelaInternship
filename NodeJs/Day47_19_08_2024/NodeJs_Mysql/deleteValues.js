var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gangothri@90",
  database: "db1"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM customers WHERE address = 'Mumbai'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("records deleted");
  });
});
