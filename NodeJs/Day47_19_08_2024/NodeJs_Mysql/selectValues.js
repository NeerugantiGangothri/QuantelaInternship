var mysql=require("mysql2");

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Gangothri@90",
    database:"db1"
})

connection.connect(function(err){
    if(err) throw err;
    connection.query("SELECT * FROM employees", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
    });
});