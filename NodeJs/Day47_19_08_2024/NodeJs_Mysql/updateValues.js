var mysql=require('mysql2');

var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gangothri@90',
    database: 'db1'
})

connection.connect(function(err){
    if(err) throw err;
    var sql= "update employees set address='Hyderabad' where name='David'";
    connection.query(sql,function(err,result){
        if(err) throw err;
        console.log(result.affectedRows+" Records updated");
    });
});