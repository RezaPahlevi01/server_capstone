// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//     router.post('/', (req, res) => {
//         const { nama, email, password } = req.body;
        
//         // Data baru tanpa enkripsi password
//         const newData = {
//             nama: nama,
//             email: email,
//             password: password  // Simpan password langsung tanpa enkripsi
//         };

//         db.query('INSERT INTO users SET ?', newData, (err, results) => {
//             if (err) {
//                 console.error("Database insert error:", err);
//                 return res.status(500).json({ error: 'Failed to insert data' });
//             }
//             res.status(201).json({ id: results.insertId, nama: newData.nama, email: newData.email });
//         });
//     });

//     return router;
// };
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Model untuk koleksi user

router.post('/', async (req, res) => {
    const { email, password, nama } = req.body;

    // Validasi input
    if (!email || !password || !nama) {
        return res.status(400).json({ message: 'Email, password, dan nama harus disertakan' });
    }

    try {
        // Mencari pengguna berdasarkan email untuk memastikan email belum terdaftar
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Membuat pengguna baru
        const newUser = new User({
            email,
            password,  // Simpan password langsung tanpa enkripsi
            nama
        });

        // Menyimpan pengguna ke database
        await newUser.save();

        // Menanggapi pendaftaran berhasil
        res.status(201).json({
            message: 'Pendaftaran berhasil',
            user: { id: newUser._id, email: newUser.email, nama: newUser.nama }
        });
    } catch (err) {
        console.error('Pendaftaran error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


