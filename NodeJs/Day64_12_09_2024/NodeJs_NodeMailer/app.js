const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Routes
app.use('/', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
