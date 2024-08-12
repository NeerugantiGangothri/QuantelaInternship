const express=require('express');
const Datastore=require('nedb-promises');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const jsonAuthMiddleware = require('./jwt')

const config = require('./config');

const app=express();

app.use(express.json())

const users=Datastore.create('Users.db');

app.get('/',jsonAuthMiddleware, async(req,res)=>{
   // res.send('REST API Authentication and Authorization');
   try{
    //fetch all documents from users
   const data=await users.find();
   console.log("Data Fetched");
   res.status(200).json({data});
   }
   catch(err){
    console.log(err);
    res.status(400).json({error:"Internal Server Error"});
   }
})



app.post('/api/register',async(req,res)=>{
  try{
     const {name, email, password}=req.body;

     if(!name || !email || !password){
        return res.status(400).json({msg:'Please enter all fields'})
     }

     if (await users.findOne({ email })) {
        return res.status(409).json({ message: 'Email already exists' })
    }

     const hashPassword= await bcrypt.hash(password,10);
     const newUser= await users.insert({
        name,
        email,
        password:hashPassword
     })
     return res.status(201).json(
        {message:'User registered Successfully',
            id:newUser._id
        });
  } catch(error){
    return res.status(500).json({message:error.message});
  }
});

app.post('/api/login', async (req, res) => {
   try {
       const { email, password } = req.body

       if (!email || !password) {
           return res.status(422).json({ message: 'Please fill in all fields (email and password)' })
       }

       const user = await users.findOne({ email })

       if (!user) {
           return res.status(401).json({ message: 'Email or password is invalid' })
       }

       const passwordMatch = await bcrypt.compare(password, user.password)

       if (!passwordMatch) {
           return res.status(401).json({ message: 'Email or password is invalid' })
       }
       //it contains three parts payload-user._id it is used to store information that you must need to used for future api calls
       // user.id is uniquely identified field that is used for access user
       const accessToken=jwt.sign({userId: user._id}, config.accessTokenSecret,{subject: 'accessApi', expiresIn: '1h' });

       return res.status(200).json({
         id: user._id,
         name: user.name,
         email: user.email,
         accessToken
     });

      }
      catch (error) {
         return res.status(500).json({ message: error.message })
     }
 });

 app.put('/profile',jsonAuthMiddleware,async(req,res)=>{
    try{
        const userId=req.user.userId;
        const {name,email,password}=req.body;

        if(!name && !email && !password){
            res.status(400).json({msg:"Please provide all details to change"});
        }
        const updateUser={};
        if(name){
           updateUser.name=name;
        }
        if(email){
            const existingUser=await users.findOne(email);
            if(existingUser && existingUser._id!==userId){
                res.status(409).json({msg:"Email already in use"});
            }
            updateUser.email=email;
        }
        if(password){
            const hashedPassword=await bcrypt.hash(password,10);
            updateUser.password=hashedPassword;
        }
        const user = await users.update({ _id: userId }, { $set: updateUser }, { returnUpdatedDocs: true });
        return res.status(200).json({ msg: "Profile updated successfully" });
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:"Can't Uodate User"});
    }
 })

 app.delete('/profile',jsonAuthMiddleware,async(req,res)=>{
    try{
        const userId=req.user.userId;
        const user = await users.deleteOne({ _id: userId });
        return res.status(200).json({ msg: "Profile deleted successfully" });
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Can't Delete User"});
    }
 })

 app.get('/profile',jsonAuthMiddleware, async(req,res)=>{
    try{
    const userData=req.user;
    console.log(userData);
    //const userId=req.users.userid;
    const userId = req.user.userId;

    const user=await users.findOne({_id:userId});
    res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

app.listen(3000,()=>console.log('Server Started on port 3000'));