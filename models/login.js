const db = require('../database');
class login {

    static getType (username, callback) {
        db.query("select * from(select username, 'patient' as type from patient union all select username, 'doctor' as type from doctor union all select username, 'pharmacy' as type from pharmacy) as q WHERE username = $1", [username], (err, res) => {
            callback(err, res);
        });
    }

    static getDoctor (username, callback) {
    db.query("select * from doctor WHERE username = $1", [username], (err, res) => {
        callback(err, res);
    });
    }

    static getPatient (username, callback) {
        db.query("select * from patient WHERE username = $1", [username], (err, res) => {
            callback(err, res);
        });
    }

    static getPharmacy (username, callback) {
        db.query("select * from pharmacy WHERE username = $1", [username], (err, res) => {
            callback(err, res);
        });
    }
}

module.exports = login;