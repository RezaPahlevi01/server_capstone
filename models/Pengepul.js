const mongoose = require('mongoose');

const pengepulSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nama: { type: String, required: true }
});

const Pengepul = mongoose.model('Pengepul', pengepulSchema);

module.exports = Pengepul;
