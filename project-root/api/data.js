const express = require('express');
const router = express.Router();
const sequelize = require('../../db'); // Sesuaikan path ke db.js

router.get('/', async (req, res) => {
    try {
        // Gunakan raw query
        const [results, metadata] = await sequelize.query('SELECT * FROM users'); // Ganti dengan tabel Anda
        res.json(results);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
