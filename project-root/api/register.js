const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/', (req, res) => {
        const { nama, email, password } = req.body;
        
        // Data baru tanpa enkripsi password
        const newData = {
            nama: nama,
            email: email,
            password: password  // Simpan password langsung tanpa enkripsi
        };

        db.query('INSERT INTO users SET ?', newData, (err, results) => {
            if (err) {
                console.error("Database insert error:", err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            res.status(201).json({ id: results.insertId, nama: newData.nama, email: newData.email });
        });
    });

    return router;
};
