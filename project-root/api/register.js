const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = (req, res) => {
    const { nama, email, password } = req.body;

    const newData = { nama, email, password };

    db.query('INSERT INTO users SET ?', newData, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database insert error' });
        }
        res.status(201).json({
            id: results.insertId,
            nama: newData.nama,
            email: newData.email
        });
    });
};
