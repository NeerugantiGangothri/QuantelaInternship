const express=require('express');
//const { route } = require('./url');


const router=express.Router();

router.get('/',(req,res)=>{
    return res.render('home');
});

module.exports=router;
