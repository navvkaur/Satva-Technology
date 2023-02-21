const Sequelize = require('sequelize');

const sequelize = require('../Utils/Database');
const CustomerAddresses = sequelize.define('customeraddresses', {
    AddressId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    
    Streetaddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    AddressType: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]]
      }
    },
    IsBillingSameAsShipping: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  
  module.exports = CustomerAddresses;