const express = require('express');
const router = express.Router();
const { Emp } = require('../models/empModel');
const bcrypt = require('bcrypt');


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Emp.findOne({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
            const users = await Emp.findAll();
            res.render('users', { users });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during login');
    }
});


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Emp.create({ userName, email, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up');
    }
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Emp.findByPk(id);
        if (user) {
            res.render('edit', { user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data');
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { userName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Emp.update({ userName, email, password: hashedPassword }, { where: { id } });
        res.redirect('/login'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Emp.destroy({ where: { id } });
        res.redirect('/login'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});


module.exports = router;
