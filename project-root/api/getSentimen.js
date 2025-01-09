const express = require('express');
const Sentimen = require('../../models/Sentimen'); // Mengimpor model Sentimen
const router = express.Router();

// Endpoint untuk mengambil semua data sentimen
router.get('/', async (req, res) => {
    try {
        const sentimenData = await Sentimen.findAll(); // Mengambil semua data sentimen
        res.status(200).json(sentimenData); // Mengembalikan data sentimen
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
