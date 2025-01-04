const express = require('express');
const router = express.Router();

// Endpoint untuk menerima feedback
router.post('/', (req, res) => {
    const { email, feedback_text } = req.body;

    // Validasi data
    if (!feedback_text) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Validasi email jika diberikan
    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }

    // Query untuk memasukkan data feedback
    const sql = 'INSERT INTO feedback SET ?';
    const values = {
        email: email || null, // Jika email tidak diberikan, set null
        feedback_text: feedback_text,
        created_at: new Date()
    };

    req.db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error occurred!' });
        }

        // Mengirimkan response jika feedback berhasil disimpan
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    });
});

module.exports = router;
