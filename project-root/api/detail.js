const express = require('express');
const router = express.Router();
const User = require('../../models/Detail'); // Pastikan model User sudah ada

router.post('/', async (req, res) => {
    const { nama, email, password } = req.body;

    // Validasi input
    if (!email || !password || !nama) {
        return res.status(400).json({ message: 'Email, password, dan nama harus disertakan' });
    }

    try {
        // Mencari pengguna berdasarkan email untuk memastikan email belum terdaftar
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Membuat pengguna baru tanpa enkripsi password
        const newUser = new User({
            email,
            password,  // Simpan password langsung tanpa enkripsi
            nama
        });

        // Menyimpan pengguna ke database
        await newUser.save();

        // Menanggapi pendaftaran berhasil
        res.status(201).json({
            message: 'Pendaftaran berhasil',
            user: { id: newUser._id, email: newUser.email, nama: newUser.nama }
        });
    } catch (err) {
        console.error('Pendaftaran error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;