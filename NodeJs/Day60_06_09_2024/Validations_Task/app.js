const express=require('express');
const {body,validationResult}=require('express-validator');
const multer=require('multer');
const bcrypt=require('bcryptjs');
const session=require('express-session');
const path = require('path');


const app=express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:false}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'./uploads/'),
    filename:(req,file,cb)=>cb(null,file.originalname)
});
const upload=multer({storage:storage});

//session
app.use(session({
    secret:'secrete',
    resave:false,
    saveUninitialized:true
}));

const users = [];   

app.get('/register',(req,res)=>{
    res.render('form',{errors:[]});
});

app.post('/register',
    upload.single('profilePhoto'),
    [
        body('name').trim().notEmpty().withMessage('Name is required')
            .isAlpha().withMessage('Name must contain only letters')
            .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
        body('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[\W]/).withMessage('Password must contain at least one special character')
        .trim(),
        body('dob').isDate().withMessage('Invalid date of birth')
        .custom((dob) => {
        const selectedDate = new Date(dob);
        const today = new Date();
        if (selectedDate > today) {
            throw new Error('Date of birth must be in the past');
        }
        return true;
    })
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render('form',{errors:errors.array()});
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        users.push({
            name:req.body.name,
            email:req.body.email,
            dob:req.body.dob,
            profilePhoto:req.file.filename,
            password:hashedPassword
        });
        res.redirect('/login');
    }
);

app.get('/login',(req,res)=>{
    res.render('login',{errors:[]});
});

app.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage('Password is Required')
    ],
    async(req,res)=>{
        console.log(req.body);
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render('login',{errors:errors.array()});                                                          
        }
        const user = users.find(user => user.email === req.body.email);
        if(!user){
            return res.render('login',{errors:[{msg:"Email not found"}]});
        }
        const match=await bcrypt.compare(req.body.password, user.password);
        if(!match){
            return res.render('login',{errors:[{msg:'Invalid Password'}]});
        }
        req.session.user = user;
        res.redirect('/profile');
    }

)

app.get('/profile',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/login');
    }
    res.render('profile',{user:req.session.user});
});

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
       return res.redirect('login')
    })
    res.render('profile',{user:req.session.user});
})

app.listen(8080,()=>{
    console.log('Server Running at port 8080');
})