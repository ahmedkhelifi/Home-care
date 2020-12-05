const db = require('../database');

class Patient {
  static retrieveAll (callback) {
    db.query('SELECT * from patient', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveUser (patientID, callback) {
    db.query('SELECT * from patient WHERE patientID = $1', [patientID], (err, res) => {
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


  static insert (firstName, LastName, email, birthdate, username, password, callback) {
    let addressid = new Date().valueOf().toString()
      db.query('INSERT INTO patient (username, password, firstName, LastName , birthdate, addressid) VALUES ($1, $2,$3, $4, $5, $6)', [username, password, firstName, LastName , birthdate, "1"], (err, res) => {
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