const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Project extends Model {}

Project.init({
  slug: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brief: {
    type: DataTypes.STRING,
    allowNull: false
  },
  document: {
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

module.exports = Project;