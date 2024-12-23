const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/', (req, res) => {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password harus disertakan' });
        }

        // Query database untuk menemukan pengguna berdasarkan email
        db.query('SELECT * FROM pengepul WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Email atau password salah' });
            }

            const user = results[0];

            // Bandingkan password langsung tanpa bcrypt
            if (password !== user.password) {
                return res.status(401).json({ message: 'Email atau password salah' });
            }

            // Login berhasil
            res.status(200).json({
                message: 'Login berhasil',
                user: { id: user.id, email: user.email }
            });
        });
    });

    return router;
};
