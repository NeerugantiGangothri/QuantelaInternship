const User=require('../models/user');

async function handlegetAllUsers(req,res) {
    const allDbusers= await User.find({});
     return res.json(allDbusers);
}

async function handleGetUserbyid(req,res) {
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({error:"User Not Found"});
    }
    else{
        res.json(user);
    }
}

async function handleUpdateUserbyid(req,res) {
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.json({status:"Success"});
    
}

async function handleDeleteUserbyid(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
}

async function handleCreateUser(req,res) {
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
    return res.status(201).json({status:"Success",id:result._id});
}

module.exports={
    handlegetAllUsers,
    handleGetUserbyid,
    handleUpdateUserbyid,
    handleDeleteUserbyid,
    handleCreateUser,
}