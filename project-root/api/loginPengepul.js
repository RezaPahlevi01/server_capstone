const express = require('express');
const { Pengepul } = require('../../models/Pengepul'); // Sesuaikan path model Pengepul
const router = express.Router();

// Endpoint POST: Login pengepul
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus disertakan' });
    }

    try {
        const pengepul = await Pengepul.findOne({ where: { email } });

        if (!pengepul || pengepul.password !== password) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        res.status(200).json({
            message: 'Login berhasil',
            pengepul: {
                id: pengepul.id,
                email: pengepul.email,
                nama: pengepul.nama,
                alamat: pengepul.Address, // Menambahkan alamat
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Endpoint GET: Ambil data pengepul berdasarkan email
router.get('/', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email harus disertakan' });
    }

    try {
        const pengepul = await Pengepul.findOne({ where: { email } });

        if (!pengepul) {
            return res.status(404).json({ message: 'Pengepul tidak ditemukan' });
        }

        res.status(200).json({
            message: 'Pengepul ditemukan',
            pengepul: {
                id: pengepul.id,
                email: pengepul.email,
                nama: pengepul.nama,
                alamat: pengepul.Address,
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Endpoint PUT: Update data pengepul
router.put('/:id', async (req, res) => {
    const { id } = req.params; // ID dari URL
    const { nama, email, password, Address } = req.body; // Data yang akan diupdate

    try {
        const pengepul = await Pengepul.findByPk(id); // Cari pengepul berdasarkan ID

        if (!pengepul) {
            return res.status(404).json({ message: 'Pengepul tidak ditemukan' });
        }

        // Update data pengepul
        pengepul.nama = nama || pengepul.nama;
        pengepul.email = email || pengepul.email;
        pengepul.password = password || pengepul.password;
        pengepul.Address = Address || pengepul.Address;

        // Validasi email baru tidak digunakan oleh pengguna lain
        if (email && email !== pengepul.email) {
            const emailExists = await Pengepul.findOne({ where: { email } });
            if (emailExists) {
                return res.status(400).json({ message: 'Email sudah digunakan oleh pengguna lain' });
            }
        }

        await pengepul.save(); // Simpan perubahan

        res.status(200).json({
            message: 'Data pengepul berhasil diperbarui',
            pengepul: {
                id: pengepul.id,
                nama: pengepul.nama,
                email: pengepul.email,
                alamat: pengepul.Address,
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
