const express = require('express');
const router = express.Router();

// Endpoint untuk mendapatkan data pengguna berdasarkan ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    // Query untuk mencari pengguna berdasarkan ID
    const sql = 'SELECT * FROM users WHERE id = ?';
    
    req.db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Periksa apakah pengguna ditemukan
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mengembalikan data pengguna
        res.status(200).json(results[0]);
    });
});

module.exports = router;
