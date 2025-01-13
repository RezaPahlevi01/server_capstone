const express = require('express');
const { Pengepul } = require('../../models/Pengepul'); // Mengimpor model Sentimen
const router = express.Router();

// Endpoint untuk mengambil semua data sentimen
router.get('/', async (req, res) => {
    try {
        const PengepulData = await Pengepul.findAll(); // Mengambil semua data sentimen
        res.status(200).json(PengepulData); // Mengembalikan data sentimen
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
