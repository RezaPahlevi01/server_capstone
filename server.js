const express = require('express');
const mysql = require('mysql');
const app = express();

// Import semua rute API
const dataRoutes = require('./project-root/api/data');
const detailRoutes = require('./project-root/api/detail');
const loginRoutes = require('./project-root/api/login');
const registerRoutes = require('./project-root/api/register');
const loginPengepulRoutes = require('./project-root/api/loginPengepul');
const getUserRoutes = require('./project-root/api/getUser');
const sentimenRoutes = require('./project-root/api/sentimen');

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Buat koneksi ke MySQL menggunakan environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'databasecapstone'
});

// Cek koneksi database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Middleware untuk akses database
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Log setiap request
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Rute utama
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Rute-rute API
app.use('/api/data', dataRoutes);
app.use('/api/detail', detailRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/loginPengepul', loginPengepulRoutes);
app.use('/api/getUser', getUserRoutes);
app.use('/api/sentimen', sentimenRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000; // Vercel akan set PORT secara otomatis
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
