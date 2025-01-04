const { DataTypes } = require('sequelize');

// Definisikan model User
const Pengepul = sequelize.define('Pengepul', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Pengepul;