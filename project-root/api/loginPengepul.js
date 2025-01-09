const express = require('express');
const bcrypt = require('bcryptjs');
const { Pengepul } = require('../../models'); // Pastikan path model pengepul benar
const router = express.Router();

// Endpoint login pengepul
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        console.log('Input tidak lengkap:', { email, password });
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    try {
        // Cari pengepul berdasarkan email menggunakan Sequelize
        const pengepul = await Pengepul.findOne({ where: { email } });

        // Periksa apakah pengepul ditemukan
        if (!pengepul) {
            console.warn(`Email tidak ditemukan: ${email}`);
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Periksa password menggunakan bcrypt
        const isPasswordValid = await bcrypt.compare(password, pengepul.password);
        if (!isPasswordValid) {
            console.warn(`Password salah untuk email: ${email}`);
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        console.log(`Login berhasil untuk pengepul dengan email: ${email}`);
        res.status(200).json({
            message: 'Login berhasil',
            pengepul: { id: pengepul.id, email: pengepul.email, nama: pengepul.nama },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
