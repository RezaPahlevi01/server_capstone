// models/Pengepul.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sesuaikan dengan file koneksi Sequelize Anda

const Pengepul = sequelize.define('Pengepul', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'pengepul',
  timestamps: true, // Menggunakan timestamps (createdAt, updatedAt)
});

module.exports = { Pengepul };
