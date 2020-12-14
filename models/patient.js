const db = require('../database');

class Patient {
  static retrieveAll (callback) {
    db.query('SELECT * from patient', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveUser (username, callback) {
    db.query('SELECT * from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveUserMedication (username, callback) {
    db.query('SELECT medication from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static saveUserMedication (username, medication, callback) {
      db.query('UPDATE patient SET medication = $2 WHERE username = $1', [username, medication], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveSpecific (data, callback) { // can play with data variable how I want
   db.query(data, (err, res) => {
        if (err.error)
          return callback(err);
        callback(res);
    });
  }


  static insert (firstName, LastName, email, birthdate, username, password, medication, callback) {
    let addressid = new Date().valueOf().toString()
      db.query('INSERT INTO patient (username, password, firstName, LastName , birthdate, addressid, medication) VALUES ($1, $2,$3, $4, $5, $6, $7)', [username, password, firstName, LastName , birthdate, "1", medication], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static massInsert (mass, callback) {
      db.query(mass, (res) => {
      //TODO error handling
      console.log(res)
      callback(res)
    });
  }

}

module.exports = Patient;