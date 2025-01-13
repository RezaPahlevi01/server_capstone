const express = require('express');
const { Pengepul } = require('../../models/Pengepul'); // Sesuaikan path model Pengepul
const router = express.Router();

// Handler untuk metode POST (login)
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    try {
        const pengepul = await Pengepul.findOne({ where: { email } });

        if (!pengepul || pengepul.password !== password) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        res.status(200).json({
            message: 'Login berhasil',
            pengepul: {
                id: pengepul.id,
                email: pengepul.email,
                nama: pengepul.nama,
                alamat: pengepul.Address, // Menambahkan properti Address
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Handler untuk metode GET (ambil data pengguna berdasarkan email)
router.get('/', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email harus disertakan' });
    }

    try {
        const pengepul = await Pengepul.findOne({ where: { email } });

        if (!pengepul) {
            return res.status(404).json({ message: 'Pengepul tidak ditemukan' });
        }

        res.status(200).json({
            message: 'Pengepul ditemukan',
            pengepul: {
                id: pengepul.id,
                email: pengepul.email,
                nama: pengepul.nama,
                alamat: pengepul.Address, // Menambahkan properti Address
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
