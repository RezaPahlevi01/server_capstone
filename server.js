// const express = require('express');
// const mysql = require('mysql2');
// const app = express();

// // Import semua rute API
// const dataRoutes = require('./project-root/api/data');
// const loginRoutes = require('./project-root/api/login');
// const registerRoutes = require('./project-root/api/register');
// const loginPengepulRoutes = require('./project-root/api/loginPengepul');
// const getUserRoutes = require('./project-root/api/getUser');
// const sentimenRoutes = require('./project-root/api/sentimen');
// const getSentimenRoutes = require('./project-root/api/getSentimen');
// const penjualanRoutes = require('./project-root/api/penjualan');
// const detailPenjualanRoutes = require('./project-root/api/detailPenjualan');
// const getPenjualanRoutes = require('./project-root/api/getPenjualan');

// // Middleware untuk parsing JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Buat koneksi ke MySQL menggunakan environment variables
// const db = mysql.createConnection({
//     host: process.env.DB_HOST || 'homelaundry.my.id',
//     user: process.env.DB_USER || 'homelaun_capstone_ulhaq',
//     password: process.env.DB_PASSWORD || 'capstone_ulhaq_1234_',
//     database: process.env.DB_NAME || 'homelaun_capstone_ulhaq'
// });

// // Cek koneksi database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Connected to MySQL database!');
// });

// // Middleware untuk akses database
// app.use((req, res, next) => {
//     req.db = db;
//     next();
// });

// // Log setiap request
// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
// });

// // Rute utama
// app.get('/', (req, res) => {
//     res.send('Welcome to the API!');
// });

// // Rute-rute API
// app.use('/api/data', dataRoutes);
// app.use('/api/login', loginRoutes);
// app.use('/api/register', registerRoutes);
// app.use('/api/loginPengepul', loginPengepulRoutes);
// app.use('/api/getUser', getUserRoutes);
// app.use('/api/sentimen', sentimenRoutes);
// app.use('/api/getSentimen', getSentimenRoutes);
// app.use('/api/penjualan', penjualanRoutes);
// app.use('/api/detailPenjualan', detailPenjualanRoutes);
// app.use('/api/getPenjualan', getPenjualanRoutes);

// // Jalankan server
// const PORT = process.env.PORT || 3000; // Vercel akan set PORT secara otomatis
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// server.js
const express = require('express');
const app = express();
const sequelize = require('./db');


// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log setiap request
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Rute utama
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Import semua rute API
const dataRoutes = require('./project-root/api/data');
const loginRoutes = require('./project-root/api/login');
const registerRoutes = require('./project-root/api/register');
const loginPengepulRoutes = require('./project-root/api/loginPengepul');
const getUserRoutes = require('./project-root/api/getUser');
const sentimenRoutes = require('./project-root/api/sentimen');
const getSentimenRoutes = require('./project-root/api/getSentimen');
const penjualanRoutes = require('./project-root/api/penjualan');
const detailPenjualanRoutes = require('./project-root/api/detailPenjualan');
const getPenjualanRoutes = require('./project-root/api/getPenjualan');
const penjualanTerbaruRoutes = require('./project-root/api/penjualanTerbaru');
const getPengepulRoutes = require('./project-root/api/getPengepul');


// Rute-rute API
app.use('/api/data', dataRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/loginPengepul', loginPengepulRoutes);
app.use('/api/getUser', getUserRoutes);
app.use('/api/sentimen', sentimenRoutes);
app.use('/api/getSentimen', getSentimenRoutes);
app.use('/api/penjualan', penjualanRoutes);
app.use('/api/detailPenjualan', detailPenjualanRoutes);
app.use('/api/getPenjualan', getPenjualanRoutes);
app.use('/api/penjualanTerbaru', penjualanTerbaruRoutes);
app.use('/api/getPengepul', getPengepulRoutes);

// Cek koneksi database dan jalankan server
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

