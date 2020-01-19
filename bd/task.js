const Sequelize = require('sequelize');
const DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/startblock';
const database = new Sequelize(DATABASE_URL);

const taskDB = database.define(
  'task', {
    nickname: {
      type: Sequelize.TEXT
    }
  }, {
    timestamps: false
  }
);

module.exports = taskDB;
