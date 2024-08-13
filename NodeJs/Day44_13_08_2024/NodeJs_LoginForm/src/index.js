const express=require('express');
const bcrypt=require('bcrypt');
const collection = require('./config');

const app=express();
const port=8080;

app.use(express.json());

//set ejs as view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});


//Register
app.post('/signup',async(req,res)=>{


        const {name,password}=req.body;
    if(!name || !password){
        res.status(400).json({msg:"Please Fill all details"});
    }
    const existingUser=await collection.findOne({name});
    if(existingUser){
        res.status(400).json({msg:"User already exists"});
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);

       const newUser=await collection.insertMany({
        name:name,
        password:hashedPassword
       });
       res.status(201).json({msg:"User created successfully"});
       console.log(newUser);
    }
})

//Login

app.post('/login',async(req,res)=>{
   try{
    const {name,password}=req.body;
    const user = await collection.findOne({ name });
    if(!user){
        res.status(400).json({msg:"Email Or Password Invalid"});
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        res.status(400).json({msg:"Email Or Password Invalid"});
    }
    else{
        res.render('home');
    }
   }
   catch(err){
    console.log(err);
    res.status(400).json({error:"Can't Login"});
   }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})