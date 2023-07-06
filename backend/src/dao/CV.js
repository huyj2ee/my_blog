const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class CV extends Model {}

CV.init({
  content: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  state: {
    type: DataTypes.TINYINT,
    allowNull: false
  }
}, {
  sequelize
});

module.exports = CV;