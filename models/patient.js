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
  
    static updatePatient (patientid, username, firstName, lastName , birthdate, medication, callback) {
      db.query('UPDATE patient SET username = $2, firstName = $3, lastName = $4, birthdate = $5, medication = $6 WHERE patientid = $1', [patientid, username, firstName, lastName , birthdate, medication], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveTemperature (username, callback) {
    db.query('SELECT temperature from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static saveTemperature (username, temperature, callback) {
      db.query('UPDATE patient SET temperature = $2 WHERE username = $1', [username, temperature], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveWeight (username, callback) {
    db.query('SELECT weight from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static saveWeight (username, weight, callback) {
      db.query('UPDATE patient SET weight = $2 WHERE username = $1', [username, weight], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveBloodPressure (username, callback) {
    db.query('SELECT blood_pressure from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static saveBloodPressure (username, blood_pressure, callback) {
      db.query('UPDATE patient SET blood_pressure = $2 WHERE username = $1', [username, blood_pressure], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrievePulse (username, callback) {
    db.query('SELECT pulse from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static savePulse (username, pulse, callback) {
      db.query('UPDATE patient SET pulse = $2 WHERE username = $1', [username, pulse], (err, res) => {
      //TODO error handling
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


  static insert (firstName, lastName, email, birthdate, username, password, medication, callback) {
    let addressid = new Date().valueOf().toString()
    let timestamp =  new Date().valueOf()
      db.query('INSERT INTO patient (username, password, firstName, lastName , birthdate, addressid, pulse, weight, blood_pressure, temperature, medication) VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11)', [username, password, firstName, lastName , birthdate, "1", {pulse: [], assigned_on: timestamp}, {weight: [], assigned_on: timestamp}, {blood_pressure: [], assigned_on: timestamp}, {temperature: [], assigned_on: timestamp}, medication], (err, res) => {
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