const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    host: process.env.DB_HOST || 'homelaundry.my.id',
    username: process.env.DB_USER || 'homelaun_capstone_ulhaq',
    password: process.env.DB_PASSWORD || 'capstone_ulhaq_1234_',
    database: process.env.DB_NAME || 'homelaun_capstone_ulhaq',
});

(async () => {
    try {
        await sequelize.authenticate(); // Memastikan koneksi berhasil
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
