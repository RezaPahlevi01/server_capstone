const User = require('./models/User');
const Penjualan = require('./models/Penjualan');

// Relasi: 1 User bisa memiliki banyak Penjualan
User.hasMany(Penjualan, { foreignKey: 'user_id' });
Penjualan.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Penjualan };
