const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Home extends Model {}

Home.init({
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  quote:{
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  }
}, {
  sequelize
});

module.exports = Home;