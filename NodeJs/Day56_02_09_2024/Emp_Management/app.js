const express = require('express');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const sequelize = new Sequelize('demo', 'postgres', 'Gangothri@90', {
    host: 'localhost',
    dialect: 'postgres'
});


sequelize.authenticate().then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
