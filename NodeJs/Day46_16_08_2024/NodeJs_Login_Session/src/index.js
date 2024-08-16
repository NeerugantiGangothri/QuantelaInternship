const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set ejs as view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static("public"));

// Configure session middleware
app.use(session({
    secret: 'secrete_key', 
    //session will be saved only when it is modified
    resave: false,
    //session saved whenever user visits
    saveUninitialized: true,
    cookie: {
        maxAge: 1 * 60 * 1000 // 1 minute
    }
}));

// Routes

app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/home');
    } else {
        res.render('login');
    }
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ msg: "Please fill all details" });
        }

        const existingUser = await collection.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await collection.insertMany({
            name: name,
            password: hashedPassword
        });

        res.status(201).json({ msg: "User created successfully" });
        console.log(newUser);
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
        console.error(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await collection.findOne({ name });

        if (!user) {
            return res.status(400).json({ msg: "Email or Password Invalid" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ msg: "Email or Password Invalid" });
        }

        // Set session data
        req.session.userId = user._id;
        req.session.userName = user.name;

       // const currentTime = Date.now();
        // const sessionDuration = currentTime - req.session.loginTime;
        // //maxSessionTime is one minute after oneminute user logsout automatically if we tries to acess home page we can't able to acess because sessiontime expires.
        // const maxSessionTime = 10 * 60 * 1000; // 1 minute
    
        // if (sessionDuration > maxSessionTime) {
        //     req.session.destroy();
        //     return res.redirect('/');
        // }

        res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Can't login" });
    }
});

app.get('/home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    res.render('home', { userName: req.session.userName });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Error logging out" });
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
