const express=require('express');
const {Sequelize, DataTypes} = require('sequelize');
const app = express();
const port=8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const sequelize = new Sequelize('demo','postgres','Gangothri@90', {
    host: 'localhost',
    dialect: 'postgres'
});


const Emp = sequelize.define( "Emp", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    userName: {
        type:DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate:{
        isEmail: true, 
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, );


async function main() {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');

     app.get('/users', async(req,res)=>{
      const users = await Emp.findAll();
      console.log(users);
      res.send(users);
     });

     app.post('/add',async(req,res)=>{
        const user = await Emp.create(req.body);
        res.send(user);
     })

     app.put('/put/:id',async(req,res)=>{
        const id = req.params.id;
       const user= await Emp.update(req.body, { where: { id: id } });
       res.send(user);

     })

     app.delete('/delete/:id',async(req,res)=>{
        const id = req.params.id;
        const user = await Emp.destroy({ where: { id: id } });
        res.send({
            msg:"Use Deleted Successfully"
        });
     })

  
    } catch (error) {
      console.error(error);
    }
    // finally{
    //     await sequelize.close();
    // }
  }
  
  main();

  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  });



