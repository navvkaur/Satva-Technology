const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.Database,'root',process.env.password,{
  dialect :'mysql',
  host: 'localhost'
});

module.exports = sequelize;