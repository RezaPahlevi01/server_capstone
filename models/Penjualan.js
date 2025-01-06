const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3306/databasecapstone'); // Sesuaikan dengan konfigurasi DB Anda

const Penjualan = sequelize.define('Penjualan', {
    jenis_sampah: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    berat_sampah: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    lokasi_pengguna: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bank_sampah: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Pastikan model Users sudah ada
        key: 'id',
      },
    },
  }, {
    tableName: 'penjualan', // Sesuaikan dengan nama tabel yang ada di database
  });
  
  module.exports = { Penjualan };
  
