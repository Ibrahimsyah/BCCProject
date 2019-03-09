const conn = require('./connection')
const Sequelize = require('sequelize')

module.exports = conn.define(
  'TemanKerja',
  {
    namaperusahaan: {
      type: Sequelize.STRING,
      allowNull: false
    },
    alamat: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deskripsi: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    like: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dislike: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    gaji: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0
    },
    tipe: {
      type: Sequelize.STRING,
      allowNull: false
    },
    posisi: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo_url: {
      type: Sequelize.STRING,
      defaultValue: '/images/default.jpg'
    },
    penerbit : {
      type:Sequelize.STRING,
      allowNull: false
    },
    lamar_url:{
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)