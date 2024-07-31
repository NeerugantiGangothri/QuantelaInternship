const express=require('express');
const file=require('fs');
const users=require('./MOCK_DATA.json');
const app=express();
const port=8080;

//Middleware 
//URL-encoded data is typically used when submitting form data in a web application. 
//The data sent to the server will be URL-encoded like this: name=John+Doe&age=30
//it parses the URL-encoded data and makes it available under req.body in the request handler.
//extended: false: Uses the querystring library to parse the URL-encoded data. This can handle simple key-value pairs.if it is true it handles nested objects
app.use(express.urlencoded({extended:false}));

app.get('/api/users',(req,res)=>{
    //response should be returned in json format
    return res.json(users);
});
app.get('/api/users/:id',(req,res)=>{
    //when id is given with url it treates as string, we have to convert that string to number
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    res.json(user);

});
app.post('/api/users',(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1});
    file.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:'Success',id:users.length+1});
    });
});

app.listen(port,()=>{console.log(`Server Started at ${port}`)});