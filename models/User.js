const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Pastikan ini sesuai dengan jalur ke file db.js

// Definisikan model User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
}, {
    tableName: 'users', // Nama tabel di database
    timestamps: true, // Menyertakan createdAt dan updatedAt
});

module.exports = User;
