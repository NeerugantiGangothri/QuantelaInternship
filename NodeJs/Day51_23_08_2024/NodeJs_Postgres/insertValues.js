const { Client }=require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'Gangothri@90',
    port: 5432,
});

client.connect()
.then(()=>console.log("Postegres Connected"))
.catch(err=>console.log("Error in Connecting",err.stack));

const insertQuery=` INSERT INTO demoTable (username,email) VALUES 
('JohnDoe','johnDoe@example.com'),
('Alice','alice@example.com'),
('Sam','sam@example.com');
`;

client.query(insertQuery,(err,results)=>{
    if(err){
        console.log("Error in Inserting Values",err.stack);
    }
    else{
        console.log("Values are Inserted successfully");
    }
});
