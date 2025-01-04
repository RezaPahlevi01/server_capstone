const express = require('express');
const router = express.Router();

// Endpoint login pengepul
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        console.log('Input tidak lengkap:', { email, password });
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    // Query untuk mencari pengepul berdasarkan email
    const sql = 'SELECT * FROM pengepul WHERE email = ?';
    req.db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Periksa apakah pengepul ditemukan
        if (results.length === 0) {
            console.warn(`Email tidak ditemukan: ${email}`);
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const pengepul = results[0];

        // Periksa password (pastikan untuk menggunakan hashing di lingkungan produksi)
        if (password !== pengepul.password) {
            console.warn(`Password salah untuk email: ${email}`);
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        console.log(`Login berhasil untuk pengepul dengan email: ${email}`);
        res.status(200).json({
            message: 'Login berhasil',
            pengepul: { id: pengepul.id, email: pengepul.email, nama: pengepul.nama },
        });
    });
});

module.exports = router;
