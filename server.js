// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json()); 

// // Konfigurasi database
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'databasecapstone'
// });

// // Koneksi ke database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database.');
// });

// // Endpoint untuk mendapatkan data
// app.get('/api/data', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// app.post('/api/register', (req, res) => {
//     try {
//         const { nama, email, password } = req.body;
        
//         // Data baru tanpa enkripsi password
//         const newData = {
//             nama: nama,
//             email: email,
//             password: password  // Simpan password langsung tanpa enkripsi
//         };

//         db.query('INSERT INTO users SET ?', newData, (err, results) => {
//             if (err) {
//                 console.error("Database insert error:", err);
//                 res.status(500).json({ error: 'Failed to insert data' });
//             } else {
//                 res.status(201).json({ id: results.insertId, nama: newData.nama, email: newData.email });
//             }
//         });
//     } catch (err) {
//         console.error("Error in registration:", err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     // Validasi input
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email dan password harus disertakan' });
//     }

//     // Query database untuk menemukan pengguna berdasarkan email
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Email atau password salah' });
//         }

//         const user = results[0];

//         // Bandingkan password langsung tanpa bcrypt
//         if (password !== user.password) {
//             return res.status(401).json({ message: 'Email atau password salah' });
//         }

//         // Login berhasil
//         res.status(200).json({
//             message: 'Login berhasil',
//             user: { id: user.id, email: user.email }
//         });
//     });
// });

// app.post('/api/loginPengepul', (req, res) => {
//     const { email, password } = req.body;

//     // Validasi input
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email dan password harus disertakan' });
//     }

//     // Query database untuk menemukan pengguna berdasarkan email
//     db.query('SELECT * FROM pengepul WHERE email = ?', [email], (err, results) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Email atau password salah' });
//         }

//         const user = results[0];

//         // Bandingkan password langsung tanpa bcrypt
//         if (password !== user.password) {
//             return res.status(401).json({ message: 'Email atau password salah' });
//         }

//         // Login berhasil
//         res.status(200).json({
//             message: 'Login berhasil',
//             user: { id: user.id, email: user.email }
//         });
//     });
// });

// // Menjalankan server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const mysql = require('mysql');  // Pastikan mysql di-import
const cors = require('cors');
const data = require('./api/data');
const register = require('./api/register');
const login = require('./api/login');
const loginPengepul = require('./api/loginPengepul');

const app = express();
const port = 3000;

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost', // Ganti dengan host database Anda jika bukan localhost
    user: 'root',      // Ganti dengan username database Anda
    password: '',      // Ganti dengan password database Anda
    database: 'databasecapstone' // Ganti dengan nama database Anda
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware
app.use(cors());
app.use(express.json());

// Menggunakan routing untuk setiap API
app.use('/api/data', data(db));  // Pass db ke dalam route
app.use('/api/register', register(db));  // Pass db ke dalam route
app.use('/api/login', login(db));  // Pass db ke dalam route
app.use('/api/loginPengepul', loginPengepul(db));  // Pass db ke dalam route

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

