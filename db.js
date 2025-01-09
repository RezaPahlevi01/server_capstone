const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'homelaundry.my.id',
    username: process.env.DB_USER || 'homelaun_capstone_ulhaq',
    password: process.env.DB_PASSWORD || 'capstone_ulhaq_1234_',
    database: process.env.DB_NAME || 'homelaun_capstone_ulhaq'
});

module.exports = sequelize;
