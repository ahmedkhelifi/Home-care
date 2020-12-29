const db = require('../database');
class login {

    static getType (username, callback) {
        console.log('getType')
        db.query("select * from(select username, 'patient' as type from patient union all select username, 'doctor' as type from doctor union all select username, 'pharmacy' as type from pharmacy) as q WHERE LOWER(username) = $1", [username], (err, res) => {
            let result = res
            if(typeof result != 'object')
                result = []
            if(result.length < 1)
                result = [ { type: undefined } ]
            callback(err, result);
        });
    }

    static getDoctor (username, callback) {
    db.query("select * from doctor WHERE LOWER(username) = $1", [username], (err, res) => {
        callback(err, res);
    });
    }

    static getPatient (username, callback) {
        db.query("select * from patient WHERE LOWER(username) = $1", [username], (err, res) => {
            callback(err, res);
        });
    }

    static getPharmacy (username, callback) {
        db.query("select * from pharmacy WHERE LOWER(username) = $1", [username], (err, res) => {
            callback(err, res);
        });
    }
}

module.exports = login;