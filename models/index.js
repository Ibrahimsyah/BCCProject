const conn = require('./connection')
require('./account')
require('./temankerja')

const giveSeed = require('../seeders')

//SYNC
let force = true
conn
  .sync({ force })
  .then(async () => {
    console.log('Database Synchronize.')
    if (force)
      await giveSeed()
  })
  .catch(err => {
    console.log('ERROR ESTABLISHING CONNECTION')
  })
  module.exports = conn