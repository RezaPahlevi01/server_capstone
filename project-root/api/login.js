const express = require('express');
const router = express.Router();

// Endpoint login
router.post('/', (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    // Query database untuk menemukan user
    const queryUserSql = 'SELECT * FROM users WHERE email = ?';
    req.db.query(queryUserSql, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Jika pengguna tidak ditemukan
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const user = results[0]; // Ambil data pengguna

        // Bandingkan password langsung (Belum menggunakan hashing)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        res.status(200).json({
            message: 'Login berhasil',
            user: { id: user.id, email: user.email, nama: user.nama },
        });
    });
});

module.exports = router;
