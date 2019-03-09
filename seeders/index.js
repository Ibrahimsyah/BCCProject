const conn = require('../models/connection')
const account = require('./account')
const temankerja = require('./temankerja')

module.exports = () => {
    conn.models.Account.bulkCreate(account)
    conn.models.TemanKerja.bulkCreate(temankerja)
}