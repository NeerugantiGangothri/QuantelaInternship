var mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gangothri@90',
    database:'db1'
})

connection.connect(function(err){
  if(err){
    throw new err;
  }
  connection.query('select * from employees order by name', function(err,result){
    if(err){
        throw  err;
    }
    console.log(result);
  })
})
