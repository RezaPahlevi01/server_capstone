const express = require('express');
const router = express.Router();

// Ambil semua data
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM penjualan'; // Ganti dengan tabel Anda
    req.db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
