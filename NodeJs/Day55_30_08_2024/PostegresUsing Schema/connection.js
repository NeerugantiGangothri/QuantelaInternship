const express=require('express');
const {Sequelize, DataTypes} = require('sequelize');


const sequelize = new Sequelize('demo','postgres','Gangothri@90', {
    host: 'localhost',
    dialect: 'postgres'
});


const User = sequelize.define( "User", {
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


    //   const user = await User.create(
    //     //{ userName: 'John Doe', email: 'john.doe@example.com', password:'1234' },
    //   //  {userName:'Alice', email:'alice@example.com', password:'123'},
    //     {userName:'Abc', email:'abc@example.com', password:'abc'}
    //   );
      //console.log(user);

      const users = await User.findAll();
      console.log(users);
  
      // await User.update({ userName: 'Jane Doe' }, { where: { id: 1 } });
    //   await User.destroy({ where: { id: 4 } });
  
    } catch (error) {
      console.error(error);
    }
    finally{
        await sequelize.close();
    }
  }
  
  main();



