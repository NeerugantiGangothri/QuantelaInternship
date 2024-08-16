const mongoose=require('mongoose');
const connect=mongoose.connect('mongodb://localhost:27017/Login');

connect.then(()=>{
  console.log("Datebase Connected Successfully");
})
.catch((err)=>{
    console.log("Error in Connecting Database",err);
})

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model('users',loginSchema);

module.exports=collection;