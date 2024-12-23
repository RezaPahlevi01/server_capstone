const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Endpoint untuk mendapatkan data
    router.get('/', (req, res) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(results);
        });
    });

    return router;
};
