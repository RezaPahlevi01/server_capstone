const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // tambahkan field lainnya sesuai kebutuhan
});

const User = mongoose.model('User', userSchema);

module.exports = User;  // Ekspor model User
