const mongoose=require('mongoose');

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

const User=mongoose.model('User',userSchema);

module.exports=User;