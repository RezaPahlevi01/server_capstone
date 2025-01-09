const express = require('express');
const { User } = require('../../models');
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
        const existingUser = await User.findOne({ where: { email } });

        // Jika email sudah terdaftar
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Insert user baru menggunakan model User
        const newUser = await User.create({
            nama,
            email,
            password, // Simpan password dalam bentuk teks biasa
        });

        // Menanggapi pendaftaran berhasil
        res.status(201).json({
            message: 'Pendaftaran berhasil',
            user: { id: newUser.id, email: newUser.email, nama: newUser.nama },
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
