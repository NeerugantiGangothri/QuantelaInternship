const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');
const bodyParser=require('body-parser');

const app = express();
const port =  3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
