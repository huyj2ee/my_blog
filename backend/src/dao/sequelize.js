const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './blog.db'
});

async function sync() {
  await sequelize.sync();
}

module.exports = { sequelize, sync };