const User = require('./User');  // Mengimpor User dari file User.js
const Penjualan = require('./Penjualan'); // Mengimpor model Penjualan

// Relasi: 1 User bisa memiliki banyak Penjualan
User.hasMany(Penjualan, { foreignKey: 'user_id' });
Penjualan.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Penjualan };
