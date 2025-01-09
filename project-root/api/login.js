const express = require('express');
const { User } = require('../../models');  // Sesuaikan dengan path model Anda
const router = express.Router();

// Endpoint login
router.post('/', async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    try {
        // Cari pengguna berdasarkan email menggunakan Sequelize
        const user = await User.findOne({ where: { email } });

        // Jika pengguna tidak ditemukan
        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Bandingkan password langsung tanpa bcrypt
        if (password !== user.password) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        res.status(200).json({
            message: 'Login berhasil',
            user: { id: user.id, email: user.email, nama: user.nama },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
