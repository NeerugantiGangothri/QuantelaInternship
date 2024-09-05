const express=require('express');
const app=express();
const {body, validationResult}=require('express-validator');

app.use(express.json());

app.post('/signup',
    //validating inputs
[
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail(),
        body('password').isLength({min: 4}).withMessage('Password should be strong'),
    ],
],
    //handling errors
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
               errors:errors.array()
            });
        }
        res.status(200).json({
            success:'Successful Sign Up!'
        })
    }
)
app.listen(8000,()=>{
    console.log('Server is running on port 8000');
});