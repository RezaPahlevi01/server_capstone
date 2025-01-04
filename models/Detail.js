const mongoose = require('mongoose');

const pengepulSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nama: { type: String, required: true }
});

const Detail = mongoose.model('Detail', pengepulSchema);

module.exports = Detail;
