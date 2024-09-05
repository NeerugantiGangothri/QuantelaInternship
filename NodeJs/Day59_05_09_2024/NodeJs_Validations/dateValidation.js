const express=require('express');
const{body,validationResult}=require('express-validator');

const app=express();
app.set('view engine','ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.render('form');
})

app.post('/submit',
    [
        body('startDate').notEmpty().withMessage('Start Date is Required'),
        body('endDate').notEmpty().withMessage('End Date is Required')
        .custom((value,{req})=>{
            if(new Date(value)<new Date(req.body.startDate)){
                throw new Error('End date cannot be earlier than start date');
            }
            return true;
        }),
    ], (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        res.send('Form submission successful!');
    }
);

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})