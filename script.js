const express = require('express');
const path = require('path')
const dotenv=require('dotenv');
const sequelize = require('./Utils/Database')
const bodyParser = require('body-parser');
const Customer = require('./Models/Customers')
const CustomerAddresses = require('./Models/CustomerAddresses')
const CountryMaster = require('./Models/CountryMaster')

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: false}));

const Country = require('./Routes/Country');
app.use(Country);

Customer.hasMany(CustomerAddresses, {
    as:'BillingAddress',
    onDelete: "CASCADE",  
});
Customer.hasMany(CustomerAddresses, {
    as:'ShippingAddress',
    onDelete: "CASCADE",  
});

CustomerAddresses.belongsTo(Customer);
CountryMaster.hasMany(Customer);
Customer.belongsTo(CountryMaster);

sequelize.sync().then((res)=>{
    app.listen(process.env.PORT,()=> {
      console.log(`Listening on port ${process.env.PORT}`);

  })
  }).catch((err)=>{
    console.log(err)
  })
