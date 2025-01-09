const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Sesuaikan dengan jalur ke file db.js

// Definisikan model Penjualan
const Penjualan = sequelize.define('Penjualan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nama tabel yang sesuai
      key: 'id',
    },
  },
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'penjualan', // Nama tabel di database
  timestamps: true, // Menyertakan createdAt dan updatedAt
});

module.exports = Penjualan;
