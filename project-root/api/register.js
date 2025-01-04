const express = require('express');
const router = express.Router();

// Endpoint register user
router.post('/', async (req, res) => {
    const { nama, email, password } = req.body;

    // Validasi input
    if (!email || !password || !nama) {
        return res.status(400).json({ message: 'Email, password, dan nama harus disertakan' });
    }

    try {
        // Cek apakah email sudah digunakan
        const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
        req.db.query(checkEmailSql, [email], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Jika email sudah terdaftar
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email sudah terdaftar' });
            }

            // Insert user baru ke database tanpa hashing password
            const insertUserSql = 'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)';
            req.db.query(insertUserSql, [nama, email, password], (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Menanggapi pendaftaran berhasil
                res.status(201).json({
                    message: 'Pendaftaran berhasil',
                    user: { id: result.insertId, email, nama }
                });
            });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
