const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'test',
    'root', //username DB
    'root', //pass DB
    {
        dialect: 'mysql',
        port: 3306,
        operatorsAliases: false,
        logging: false
    }
)