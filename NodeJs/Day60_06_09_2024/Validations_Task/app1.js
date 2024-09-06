const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const { Pool } = require('pg');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',
    database: 'demo',          
    password: 'Gangothri@90',    
    port: 5432,
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage: storage });

app.use(session({
    secret: 'secrete',
    resave: false,
    saveUninitialized: true
}));


app.get('/register', (req, res) => {
    res.render('form', { errors: [] });
});

app.post('/register',
    upload.single('profilePhoto'),
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        body('password').isLength({ min: 6 }).withMessage('Password Must be at least 6 characters').trim(),
        body('dob').isDate().withMessage('Invalid date of birth')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('form', { errors: errors.array() });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { name, email, dob } = req.body;
        const profilePhoto = req.file ? req.file.filename : null;

        console.log('Uploaded file:',req.file);

        try {
            await pool.query('INSERT INTO users (name, email, password, dob, profilePhoto) VALUES ($1, $2, $3, $4, $5)', 
                [name, email, hashedPassword, dob, profilePhoto]);
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.render('form', { errors: [{ msg: 'Error registering user' }] });
        }
    }
);

app.get('/login', (req, res) => {
    res.render('login', { errors: [] });
});

app.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];
            if (!user) {
                return res.render('login', { errors: [{ msg: "Email not found" }] });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.render('login', { errors: [{ msg: 'Invalid Password' }] });
            }

            req.session.user = user;
            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.render('login', { errors: [{ msg: 'Error logging in' }] });
        }
    }
);

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    console.log('User:', req.session.user); 
    res.render('profile', { user: req.session.user });
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.listen(8000, () => {
    console.log('Server Running at port 8000');
});
