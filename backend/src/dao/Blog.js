const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Blog extends Model {}

Blog.init({
  slug: {
    type: DataTypes.STRING,
    primaryKey: true
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
  state: {
    type: DataTypes.TINYINT,
    allowNull: false
  }
}, {
  sequelize
});

module.exports = Blog;