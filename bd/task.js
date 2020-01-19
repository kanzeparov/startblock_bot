const Sequelize = require('sequelize');

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
