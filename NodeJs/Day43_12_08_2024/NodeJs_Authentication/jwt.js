const jwt=require('jsonwebtoken');
const config=require('./config');

const jsonAuthMiddleware = (req,res,next) =>{
    //firts check whether req header has authorization or not
    const authorization=req.headers.authorization;
    if(!authorization){
        res.status(400).json({error:"Token Not Found"});
    }

    //Extracte json web tokens from request headers for ex: in authorization token look like <Bearer> Token 
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(400).json({error:'Unauthorized'});
    }
    try{
        //verify token and extract the payload information 
        //Secrete Key which is used to sign the token must be used for verify the token that is config.acessTokenSecret
        const decoded=jwt.verify(token,config.accessTokenSecret);
        //attaches decoded payload to the req.user. We can use req.user directly to acess payload properties
        req.user=decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:'Invalid Token'});
    }
}

module.exports=jsonAuthMiddleware;