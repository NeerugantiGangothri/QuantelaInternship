const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8080;

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gangothri@90',
    database: 'demo',
    multipleStatements: true
});

connection.connect(function (err, result) {
    if (err) {
        console.log("Connection Failed", err);
    }
    console.log("Connection established successfully!");

    // Create table with an 'id' column that auto-increments
    // var sql = `
    //     CREATE TABLE IF NOT EXISTS demoTable (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         name VARCHAR(255),
    //         location VARCHAR(255),
    //         gender VARCHAR(255)
    //     )
    // `;
    // connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created or already exists");
    // });

    // Insert records with name, location, and gender (id will auto-increment)
    // var insertSql = "INSERT INTO demoTable (name, location, gender) VALUES ?";
    // var values = [
    //     ['Alice', 'Bangalore', 'Female'],
    //     ['Priya', 'Hyderabad', 'Female'],
    //     ['Bob', 'Chennai', 'Male'],
    //     ['Charlie', 'Delhi', 'Male'],
    //     ['David', 'Mumbai', 'Male']
    // ];
    // connection.query(insertSql, [values], function (err, result) {
    //     if (err) throw err;
    //     console.log("Records inserted");
    // });
});

// Route to fetch user details
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM demoTable';

    connection.query(query, (err, results) => {
        if (err) {
            console.log("Error fetching data", err);
            res.status(500).send('Database error');
        } else {
            res.json(results);
        }
    });
});

app.get('/users/:id',(req,res)=>{
    const query = 'SELECT * FROM demoTable WHERE id = ?';
    const id = req.params.id;
    connection.query(query, id, (err, results) => {
        if(err){
            console.log("Error fetching data", err);
        }
        else{
            res.json(results);
        }
    });
});

app.put('/users/put',(req,res)=>{
    const query = "UPDATE demoTable SET name = ?, location = ?, gender = ? WHERE id = ?";
    const values = [req.body.name, req.body.location, req.body.gender, req.body.id];
    connection.query(query, values, (err, results) => {
        if (err) {
            console.log("Error updating data", err);
            res.status(500).send('Database error');
            } 
        else {
                res.json(results);
        }
    });
});

app.post('/users/post',(req,res)=>{
    const query = "INSERT INTO demoTable ( name, location, gender) VALUES (?,?,?)";
    const values = [req.body.name, req.body.location, req.body.gender];
    connection.query(query, values, (err, results) => {
        if (err) {
            console.log("Error inserting data", err);
            res.status(500).send('Database error');
            }
        else{
                res.json(results);
            }
    });
});

app.delete('/users/:id',(req,res)=>{
    const query='DELETE FROM demoTable WHERE id=?';
    const id=req.params.id;
    connection.query(query,id,(err,result)=>{
        if(err){
            console.log("Error deleting data",err);
        }
        else{
            res.json(result);       
         }
    });
});

app.listen(port, () => {
    console.log("Server Connected Successfully");
});
