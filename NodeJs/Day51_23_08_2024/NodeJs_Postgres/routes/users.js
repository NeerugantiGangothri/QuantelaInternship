const express=require('express');
const {Pool}=require('pg');

const router=express.Router();
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'demo',
    password:'Gangothri@90',
    port:5432,
});

router.post('/',(req,res)=>{
    const {username,email}=req.body;
    const query="INSERT INTO users(username,email) VALUES($1,$2) RETURNING *";
    pool.query(query,[username,email],(err,results)=>{
        if(err){
            console.error(err);
            return res.status(400).send("Error");
        }
    res.send(results.rows[0]);
    });
});

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const { username, email } = req.body;
    const query = "UPDATE users SET username=$1, email=$2 WHERE id = $3 RETURNING *";
    pool.query(query, [username, email, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error updating user");
        }
        res.send(results.rows[0]);
    });
});
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    const query="DELETE FROM users WHERE id=$1 RETURNING *";
    pool.query(query,[id],(err,results)=>{
        if(err){
            console.error(err);
            return res.status(400).send("Error Deleting User");
        }
    res.send({msg:"User Deleted Successfully"});
    });
});

router.get('/',(req,res)=>{
    const query="SELECT * FROM users";
    pool.query(query,(err,results)=>{
        if(err){
            console.error(err);
        }
        res.send(results.rows);
})
});

module.exports = router;