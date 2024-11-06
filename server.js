const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'databasecapstone'
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint untuk mendapatkan data
app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint untuk registrasi user baru
app.post('/api/register', async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        
        // Enkripsi password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newData = {
            nama: nama,
            email: email,
            password: hashedPassword
        };

        db.query('INSERT INTO users SET ?', newData, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to insert data' });
            } else {
                res.status(201).json({ id: results.insertId, nama: newData.nama, email: newData.email });
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Error encrypting password' });
    }
});

// Endpoint untuk login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Temukan user berdasarkan email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            // Jika tidak ada user ditemukan
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const user = results[0]; // Ambil user pertama

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        res.status(200).json({ message: 'Login berhasil', user: { id: user.id, email: user.email } });
    });
});

// Endpoint untuk login menggunakan GET
app.get('/api/login', async (req, res) => {
    const { email, password } = req.query;

    // Pastikan email dan password ada dalam query
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    // Temukan user berdasarkan email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            // Jika tidak ada user ditemukan
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const user = results[0]; // Ambil user pertama

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        res.status(200).json({ message: 'Login berhasil', user: { id: user.id, email: user.email } });
    });
});


// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
