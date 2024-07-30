
//const http=require('http');
const express = require('express');
const app=express();
app.get("/",(req,res)=>{
    res.send("Hello from Home Page");
    //http://localhost:3000/
    //op:Hello from Home Page
});
app.get("/about",(req,res)=>{
    res.send(`Hii ${req.query.name}`);
    //http://localhost:3000/about?name=gangothri
    //op:Hii gangothri
});

app.listen(3000);

//Using Express.js offers
//simplified syntax
//Everything built in makes us work simple
//code is clean and modular