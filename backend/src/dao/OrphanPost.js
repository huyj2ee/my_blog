const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class OrphanPost extends Model {}

OrphanPost.init({
  slug: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  sequelize
});

module.exports = OrphanPost;