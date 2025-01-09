// api/sentimen.js
const express = require('express');
// Periksa apakah jalur impor ini sudah benar
const Sentimen = require('../../models/Sentimen');  // Impor model dengan benar

console.log(Sentimen);  // Log model Sentimen untuk memastikan

const router = express.Router();

// Endpoint untuk menerima feedback
router.post('/', async (req, res) => {
    const { feedback_text, email } = req.body;

    // Validasi input
    if (!feedback_text) {
        return res.status(400).json({ error: 'Feedback text is required!' });
    }

    try {
        // Simpan feedback ke database
        const sentimen = await Sentimen.create({
            feedback_text: feedback_text,
            email: email || null, // email bisa kosong atau null
        });

        // Respons sukses
        res.status(201).json({ message: 'Feedback successfully submitted!', sentimen });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            error: 'An error occurred while saving the feedback.',
            details: err.stack, // Stack trace error untuk informasi lebih lanjut
        });
    }
});

module.exports = router;
