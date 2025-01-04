// Model untuk feedback
const Sentimen = {
    // Menyimpan feedback ke database
    create: (email, feedback_text) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO feedback (email, feedback_text, created_at) VALUES (?, ?, ?)';
            const values = [email || null, feedback_text, new Date()];

            db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    // Mengambil semua feedback
    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM feedback ORDER BY created_at DESC';
            
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Mengambil feedback berdasarkan ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM feedback WHERE id = ?';
            
            db.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    // Menghapus feedback berdasarkan ID
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM feedback WHERE id = ?';
            
            db.query(sql, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = Sentimen;
