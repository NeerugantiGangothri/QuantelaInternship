const express=require('express');
const file=require('fs');
const users=require('./MOCK_DATA.json');
const app=express();
const port=8080;

//Middleware plugin
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    console.log("Hello From Middleware 1");
    //calls the next function
    next();
});
app.use((req,res,next)=>{
    console.log("Hello From Middleware 1");
    //If we dont't include next function it wont move to next code stops at middleware only
    next();
});
app.use((req,res,next)=>{
    file.appendFile('./staus.txt',`\n ${Date.now()}: ${req.method} : ${req.ip} : ${req.path}`,(err,data)=>{
        next();
    });
});

app.get('/api/users',(req,res)=>{
    //response should be returned in json format
    return res.json(users);
});
app.listen(8081,()=>{console.log("Server Started")});


// console output:
// PS C:\Users\Gangothri N\Desktop\REST API POST> node middleware.js
// Server Started
// Hello From Middleware 1
// Hello From Middleware 1