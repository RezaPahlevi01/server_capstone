const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sesuaikan dengan jalur koneksi database Anda

// Mendefinisikan model Sentimen
const Sentimen = sequelize.define('Sentimen', {
    // Kolom ID (primary key, auto increment)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Kolom teks sentimen
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Tidak boleh kosong
    },
    // Kolom tipe sentimen (positif, negatif, netral)
    feedback_text: {
        type: DataTypes.STRING,
        allowNull: false, // Tidak boleh kosong
    },
    // Kolom tanggal pembuatan sentimen
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Menetapkan tanggal dan waktu saat data dibuat
    },
}, {
    tableName: 'feedback', // Pastikan nama tabel di database sesuai
    timestamps: true, // Sequelize akan menambahkan kolom `createdAt` dan `updatedAt` otomatis
    createdAt: 'created_at', // Menyesuaikan nama kolom dengan yang ada di database
    updatedAt: false, // Jika Anda tidak ingin kolom `updatedAt`, set `false`
});

module.exports = Sentimen;
