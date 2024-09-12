const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto=require('crypto');

const users = [
    { email: 'gangotrineeruganti69@gmail.com', password: '1234' }
];

let generatedOTP; 

// OTP generator function
const generateOTP = () => {
    //return Math.floor(100000 + Math.random() * 900000).toString();  
    return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (email, otp) => {
    //nodemailer creates transport object to send mails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP for login is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

router.get('/login', (req, res) => {
    res.render('login');  
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;


    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }


    generatedOTP = generateOTP();

    // Send OTP via email
    await sendOTPEmail(email, generatedOTP);

    res.redirect(`/verify-otp?email=${email}`);

});

router.get('/verify-otp', (req, res) => {
    const { email } = req.query;  
    res.render('otp-verification', { email }); 
});

router.post('/verify-otp', (req, res) => {
    const { otp } = req.body;

    if (otp === generatedOTP) {
        return res.send('OTP verified successfully, login complete!');
    } else {
        return res.status(400).send('Invalid OTP. Please try again.');
    }
});

module.exports = router;
