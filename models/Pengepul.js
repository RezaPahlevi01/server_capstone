const mongoose = require('mongoose');

const pengepulSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Pengepul = mongoose.model('Pengepul', pengepulSchema);

module.exports = Pengepul;
