const express=require('express');
const passport=require('passport');
const session=require('express-session');
const LocalStrategy=require('passport-local').Strategy;
const flash=require('connect-flash');

const app=express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(flash());

const users=[{
    id:1,
    username:'user',
    password:'password'
}];

passport.use(new LocalStrategy(
    (username,password,done)=>{
    const user=users.find(u=>u.username===username);
    if(!user){
        return done(null,false,{message:'Invalid username'});
    }
    if(user.password!==password){
        return done(null,false,{message:'Invalid Password'});
    }
    return done(null,user);
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    const user=users.find(u=>u.id===id);
    done(null,user);
});

app.post('/login',
    passport.authenticate('local',{
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash:true
    })
);

app.get('/profile',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('profile',{user:req.user});
    }
    else{
    res.redirect('/login');
    }
})

app.get('/login',(req,res)=>{
    res.render('login',{message:req.flash('error')});
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/login');
}
app.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('This is a protected route');
});

app.listen(5000,()=>{
    console.log('Server Running on the port 5000');
});