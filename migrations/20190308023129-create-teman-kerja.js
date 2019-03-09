'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TemanKerja', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaperusahaan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      like: {
        type: Sequelize.INTEGER
      },
      dislike: {
        type: Sequelize.INTEGER
      },
      gaji: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.STRING
      },
      posisi: {
        type: Sequelize.STRING
      },
      photo_url: {
        type: Sequelize.STRING
      },
      lamar_link: {
        type: Sequelize.STRING
      },
      penerbit : {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TemanKerja');
  }
};