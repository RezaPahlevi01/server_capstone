const express = require('express');
const { Penjualan } = require('../../models/Penjualan'); // Import model Penjualan

const router = express.Router(); // Gunakan router

// Endpoint GET untuk mengambil detail penjualan berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL

    // Cari data penjualan berdasarkan ID
    const penjualan = await Penjualan.findByPk(id); // Gunakan findByPk untuk mencari berdasarkan primary key (ID)

    // Jika data tidak ditemukan, kirim response error
    if (!penjualan) {
      return res.status(404).json({ message: 'Data penjualan tidak ditemukan' });
    }

    // Kirim response dengan data penjualan
    res.status(200).json({
      message: 'Data ditemukan',
      data: penjualan,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal mengambil data', error });
  }
});

module.exports = router;
