const express = require('express');
const router = express.Router();
const { Penjualan } = require('../../models'); // Mengimpor model Penjualan

// Ambil semua data penjualan
router.get('/', async (req, res) => {
    try {
        // Mengambil semua data penjualan dari database menggunakan model Penjualan
        const penjualanData = await Penjualan.findAll();

        // Mengirimkan data penjualan sebagai respons
        res.status(200).json(penjualanData);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Database query error' });
    }
});

module.exports = router;
