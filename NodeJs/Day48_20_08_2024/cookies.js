const express=require('express');
const cookieParser=require('cookie-parser');

const port=8080;

const app=express();
//middleware
app.use(cookieParser());

app.get('/setcookie',(req,res)=>{
    //expires after maxAge
    res.cookie('username','JohnDoe',{maxAge:900000});
    res.send('Cookie set');
});

app.get('/getcookie',(req,res)=>{
    let cookie=req.cookies.username;
    res.end(`Cookie retrieved ${cookie}`);
});

app.get('/clearcookie',(req,res)=>{
    res.clearCookie('username');
    res.send('Cookie Cleared');
})
app.listen(port,()=>{console.log(`Server Started at ${port}`)});