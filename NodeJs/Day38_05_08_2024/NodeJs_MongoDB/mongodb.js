const express=require('express');
const fs=require('fs');
const mongoose=require('mongoose');
const users=require('./MOCK_DATA.json');

const app=express();
const port=8000;
//Connection
//mongoose connection alway a promise
mongoose
.connect('mongodb://127.0.0.1:27017/MongodbConnection')
.then(()=> console.log("Mongo Db Connected"))
.catch(err=>console.log("Error",err));

//Schema Defines the structure
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    gender:{
        type:String
    }
});

//Model used to perform CRUD operations
const User=mongoose.model('user',userSchema);

//Middleware
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile('log.txt',
        `\n ${Date.now()}:${req.ip} ${req.method}:${req.path}\n`,
        (err,data)=>{
            next();
        }
    );
});

//routes
//database queries are asynchronous operations they took time to complete 
//to handle these asynchronous operations effectively with less code and better error handling async await will be useful
app.get('/users',async(req,res)=>{
    //Fetching Users from database

    // User.find({})
    // .then(users=>{
    //     const html=`
    // <u>
    // ${users.map((user)=>`<li>${user.firstName} - ${user.lastName}</li>`).join("")}
    // </ul>
    // `;
    // res.send(html);
    // })
    // .catch(err=>{
    //     res.status(404).send("Can't get user");
    // });

    const users=await User.find({});

    const html=`
    <u>
    ${users.map((user)=>`<li>${user.firstName} - ${user.lastName}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
app.get('/api/users',(req,res)=>{
   // const users= await User.find({});
    return res.json(users);
})
//gives the entries which are given by the mongodb commands
app.get('/api/usersdb',async(req,res)=>{
     const users= await User.find({});
     return res.json(users);
 })
 

app.get('/api/users/:id',async(req,res)=>{
    const user=await User.findById(req.params.id);
    // const id=Number(req.params.id);
    // const user=users.find((user)=>user.id===id);
    if(!user){
        return res.status(404).json({error:"User Not Found"});
    }
    else{
        res.json(user);
    }
});

app.put('/api/users/:id',async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
  //  const data = req.body;
    
//     const id = Number(req.params.id);
//    // const user=users.find((user)=>user.id===id);
//     const userIndex = users.findIndex((user) => user.id === id);
//     const data = req.body;
//     users[userIndex] = {id : id , ...data};
       return res.json({status:"Success"});
})

app.delete('/api/users/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
})

app.post('/api/users',async(req,res)=>{
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(404).json({ms:"All Fields are required"});
    }
   const result= await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title
    });
    console.log(result);
    return res.status(201).json({status:"Success"});
    // users.push({...body, id:users.length+1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     return res.status(201).json({status:"Success", id:users.length+1});
    // });
});

app.listen(port,()=>console.log(`Server Started at port ${port}`));