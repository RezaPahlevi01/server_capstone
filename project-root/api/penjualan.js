const express = require('express');
const { Penjualan } = require('../../models/Penjualan'); // Mengimpor model dengan jalur yang benar

const router = express.Router(); // Gunakan router

// Endpoint POST untuk menambahkan data penjualan
router.post('/', async (req, res) => {
  try {
    const { jenis_sampah, berat_sampah, lokasi_pengguna, bank_sampah, user_id } = req.body;

    // Validasi input
    if (!jenis_sampah || !berat_sampah || !lokasi_pengguna || !bank_sampah || !user_id) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    // Simpan data ke database
    const penjualan = await Penjualan.create({
      jenis_sampah,
      berat_sampah,
      lokasi_pengguna,
      bank_sampah,
      user_id,
    });

    res.status(201).json({
      message: 'Data berhasil ditambahkan',
      data: penjualan,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal menambahkan data', error });
  }
});

module.exports = router;
