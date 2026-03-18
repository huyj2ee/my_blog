const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Blog extends Model {}

Blog.init({
  slug: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brief: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  baseTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseBrief: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseContent: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  }
}, {
  sequelize
});

module.exports = Blog;