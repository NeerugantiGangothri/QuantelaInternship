const express = require('express');
const path=require('path')
const app = express();

const port = 8000;

app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where view templates are located
app.set('views',path.resolve('./views'));

let employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 70000 },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', salary: 85000 },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer', salary: 65000 }
  ];

// Define a route
app.get('/', (req, res) => {
  const data = {
    title: 'Welcome to EJS',
    message: 'Hello, world!',
    employees: employees
  };
  res.render('index', data);
});

app.post('/add-employee', (req, res) => {
    const newEmployee = {
      id: parseInt(req.body.id),
      name: req.body.name,
      position: req.body.position,
      salary: parseFloat(req.body.salary)
    };
    employees.push(newEmployee);
    res.redirect('/');
  });

  app.post('/delete-employee', (req, res) => {
    const { id } = req.body;
    employees = employees.filter(employee => employee.id !== parseInt(id));
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
