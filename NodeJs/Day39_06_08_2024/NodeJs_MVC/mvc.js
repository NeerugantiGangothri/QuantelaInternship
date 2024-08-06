const express=require('express');

//const users=require('./MOCK_DATA.json');

const {connectMongodb}=require('./connection');

const { logReqRes }=require('./middlewares');

const userRouter=require('./routes/user');


const app=express();
const port=8080;


connectMongodb('mongodb://127.0.0.1:27017/mvc').then(()=>console.log('Mongo Db Connected'));


//Middleware
app.use(express.urlencoded({extended: false}));

app.use(logReqRes('log.txt'));


app.use('/api/users',userRouter);

app.listen(port,()=>console.log(`Server Started at port ${port}`));