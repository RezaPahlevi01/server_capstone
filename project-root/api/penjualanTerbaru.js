const express = require('express');
const { Penjualan } = require('../../models'); // Pastikan model Penjualan sudah benar
const router = express.Router();

// Endpoint untuk menampilkan data penjualan terbaru
router.get('/', async (req, res) => {
    try {
        // Ambil data penjualan terbaru, urutkan berdasarkan waktu (createdAt) secara descending
        const dataTerbaru = await Penjualan.findAll({
            order: [['createdAt', 'DESC']], // Urutkan berdasarkan waktu terbaru
            limit: 10, // Batasi data, misalnya hanya ambil 10 data terbaru
        });

        // Kirimkan data sebagai response
        res.status(200).json({
            message: 'Data penjualan terbaru berhasil diambil',
            data: dataTerbaru,
        });
    } catch (error) {
        console.error('Error saat mengambil data penjualan terbaru:', error);
        res.status(500).json({
            message: 'Gagal mengambil data penjualan terbaru',
            error: error.message,
        });
    }
});

module.exports = router;
