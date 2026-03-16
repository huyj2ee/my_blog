const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Home extends Model {}

Home.init({
  name:{
    type: DataTypes.STRING,
    primaryKey: true
  },
  quote:{
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
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