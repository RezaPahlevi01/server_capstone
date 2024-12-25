// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//     // Endpoint untuk mendapatkan data
//     router.get('/', (req, res) => {
//         db.query('SELECT * FROM users', (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
//             res.json(results);
//         });
//     });

//     return router;
// };
const express = require('express');
const router = express.Router();
const User = require('../../models/user'); // Pastikan path relatif benar

// Endpoint untuk mendapatkan data
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Mengambil semua data dari koleksi users
        res.json(users); // Mengirimkan data sebagai JSON
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

