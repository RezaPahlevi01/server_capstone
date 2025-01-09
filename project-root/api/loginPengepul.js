const express = require('express');
const { Pengepul } = require('../../models/Pengepul');  // Sesuaikan dengan path model pengepul
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    try {
        // Menambahkan log untuk memverifikasi apakah model Pengepul berhasil diimport
        console.log('Pengepul Model:', Pengepul);

        // Cari pengepul berdasarkan email
        const pengepul = await Pengepul.findOne({ where: { email } });

        // Periksa jika pengepul ditemukan
        if (!pengepul) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Periksa password yang diberikan
        if (password !== pengepul.password) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Login berhasil
        res.status(200).json({
            message: 'Login berhasil',
            pengepul: { id: pengepul.id, email: pengepul.email, nama: pengepul.nama },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
