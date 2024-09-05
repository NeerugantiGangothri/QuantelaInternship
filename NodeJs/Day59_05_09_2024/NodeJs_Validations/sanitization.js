const express=require('express');
const {body,sanitizeBody, validationResult}=require('express-validator');

const app=express();

app.use(express.json());

app.post('/register',
    [
        body('username').trim().escape().isLength({min:3}),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min:5}),
    ], (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        res.status(200).json({
            message:'User created successfully'
        })
    }
);

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})