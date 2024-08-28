const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
  secret: 'secrete_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


app.use('/employee', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
