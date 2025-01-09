// models/sentimen.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Pastikan jalur ke file db.js sudah benar

const Sentimen = sequelize.define('Sentimen', {
    feedback_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true, // Email bisa null
    },
}, {
    tableName: 'feedback', // Pastikan nama tabel sesuai dengan di database
    timestamps: false, // Jika Anda ingin menggunakan createdAt dan updatedAt // Gunakan kolom created_at di database
});

module.exports = Sentimen; // Mengekspor model Sentimen
