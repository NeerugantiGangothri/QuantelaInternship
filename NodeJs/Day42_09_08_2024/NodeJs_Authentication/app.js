const express=require('express');
const Datastore=require('nedb-promises');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('./config');

const app=express();

app.use(express.json())

const users=Datastore.create('Users.db');

app.get('/',(req,res)=>{
    res.send('REST API Authentication and Authorization');
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

app.listen(3000,()=>console.log('Server Started on port 3000'));