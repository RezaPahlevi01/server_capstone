const express = require('express');
const { Penjualan } = require('../../models'); // Pastikan path yang benar untuk model Penjualan

const router = express.Router();

// Endpoint POST untuk menambahkan data penjualan
router.post('/', async (req, res) => {
  try {
    const { jenis_sampah, berat_sampah, lokasi_pengguna, detail_alamat, bank_sampah, user_id } = req.body;

    // Validasi input
    if (!jenis_sampah || !berat_sampah || !lokasi_pengguna || !detail_alamat || !bank_sampah || !user_id) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    // Simpan data ke database menggunakan Sequelize
    const penjualan = await Penjualan.create({
      jenis_sampah,
      berat_sampah,
      lokasi_pengguna,
      detail_alamat,
      bank_sampah,
      user_id,
    });

    // Respon jika data berhasil ditambahkan
    res.status(201).json({
      message: 'Data berhasil ditambahkan',
      data: penjualan,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal menambahkan data', error });
  }
});

// Endpoint DELETE untuk menghapus data penjualan berdasarkan ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL

  try {
    // Cari data penjualan berdasarkan ID
    const penjualan = await Penjualan.findByPk(id);

    // Jika data tidak ditemukan
    if (!penjualan) {
      return res.status(404).json({ message: 'Data penjualan tidak ditemukan' });
    }

    // Hapus data penjualan
    await penjualan.destroy();

    // Respon jika data berhasil dihapus
    res.status(200).json({ message: 'Data penjualan berhasil dihapus' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal menghapus data', error });
  }
});

module.exports = router;
