const express = require('express');
const User = require('../../models/User'); // Mengimpor model User
const router = express.Router();

// Endpoint untuk mendapatkan data pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Cari pengguna berdasarkan ID
        const user = await User.findByPk(userId); // findByPk adalah metode Sequelize untuk mencari berdasarkan Primary Key (ID)

        // Periksa apakah pengguna ditemukan
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mengembalikan data pengguna
        res.status(200).json(user);
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
