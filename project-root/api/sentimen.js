const express = require('express');
const router = express.Router();
const { Sentimen } = require('../../models');

// Endpoint untuk menerima feedback dan sentimen
router.post('/', async (req, res) => {
    const { email, feedback_text, tipe_sentimen } = req.body;

    // Validasi data
    if (!feedback_text || !tipe_sentimen) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Validasi email jika diberikan
    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }

    try {
        // Simpan data sentimen ke database menggunakan model Sentimen
        const sentimen = await Sentimen.create({
            teks_sentimen: feedback_text,
            tipe_sentimen: tipe_sentimen,
            created_at: new Date(),
        });

        // Jika ada email, simpan juga feedback yang berhubungan dengan email (optional)
        if (email) {
            // Anda bisa membuat tabel lain untuk feedback yang berhubungan dengan pengguna
            // Namun ini akan bergantung pada struktur dan kebutuhan database Anda
        }

        // Mengirimkan response jika feedback dan sentimen berhasil disimpan
        res.status(201).json({ message: 'Feedback and Sentiment submitted successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error occurred!' });
    }
});

module.exports = router;
