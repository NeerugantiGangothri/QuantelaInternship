const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const { Pool } = require('pg'); 

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'Gangothri@90',
    port: 5432
});


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Local Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        console.log(`Username:${username}`);
        console.log(`Password:${password}`);
        try {
            const result = await pool.query('SELECT * FROM persons WHERE username = $1', [username]);
            const user = result.rows[0];

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // const isMatch = await bcrypt.compare(password, user.password);
            // if (!isMatch) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query('SELECT * FROM persons WHERE id = $1', [id]);
        const user = result.rows[0];
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Routes
app.get('/login', (req, res) => {
    const message = req.flash('error');
    res.render('login', { message });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('profile', { user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
