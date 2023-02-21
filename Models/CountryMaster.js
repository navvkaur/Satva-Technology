const Sequelize = require('sequelize');

const sequelize = require('../Utils/Database');

const CountryMaster = sequelize.define('countryMaster' , {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
       
    },
    CountryName:{
        type:Sequelize.STRING,
       
    }
})

module.exports = CountryMaster;
