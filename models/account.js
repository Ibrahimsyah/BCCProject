const conn = require('./connection')
const Sequelize = require('sequelize')

module.exports = conn.define(
  'Account',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)