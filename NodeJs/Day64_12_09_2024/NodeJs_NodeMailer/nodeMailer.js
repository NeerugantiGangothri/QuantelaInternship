const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'gangothrineeruganti@gmail.com', 
        pass: 'fnluzdqofsblatcc'   
    }
});


let mailOptions = {
    from: 'gangothrineeruganti@gmail.com',      
    to: 'gangotrineeruganti69@gmail.com',  
    subject: 'Nodemailer Example in Node Js',               
    text: 'Hii Gangothri!!, How are you?',                
    // html: '<b>Good Morning</b>'         
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Email sent:', info.response);
});
