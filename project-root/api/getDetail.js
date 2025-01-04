const express = require('express');
const router = express.Router();
const Detail = require('../../models/Detail');

// Endpoint untuk mendapatkan data pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!Detail) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(detail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
