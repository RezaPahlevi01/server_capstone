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
      model: 'users', // Nama tabel yang sesuai
      key: 'id',
    },
  },
  jenis_sampah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  berat_sampah: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lokasi_pengguna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail_alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank_sampah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'penjualan', // Nama tabel di database
  timestamps: true, // Menyertakan createdAt dan updatedAt
});

module.exports = Penjualan;
