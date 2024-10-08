const express=require('express');
const bodyParser = require('body-parser');
const userRouter=require('./routes/users');

const app=express();
const port=3000;
app.use(bodyParser.json());

app.use('/api/users',userRouter);

app.listen(port,()=>{console.log(`Server Running on port ${port}`)});