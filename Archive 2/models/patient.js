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


  static insert (firstName, LastName, birthday, email, callback) {
      db.query('INSERT INTO patient (PATIENTID, FIRSTNAME, LASTNAME, BIRTHDAY, EMAIL) VALUES ($1, $2,$3, $4, $5)', [patientID, firstName, LastName, birthday, email], (err, res) => {
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