const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('demo', 'postgres', 'Gangothri@90', {
    host: 'localhost',
    dialect: 'postgres'
});

const Emp = sequelize.define('Emp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Emp, sequelize };
