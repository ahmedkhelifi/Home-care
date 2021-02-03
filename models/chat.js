const db = require('../database');

class Chat {
  static retrieveAllMessaged (callback) {
    db.query("select c.* , case when c.fromType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = fromID) when c.fromType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = fromID) else (select name from pharmacy where pharmacyID = fromID) end as name_from, case when c.toType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = toID) when c.toType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = toID) else (select name from pharmacy where pharmacyID = toID) end as name_to from chat c", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	// type is patient, doctor oder pharmacy
  static retrieveAllMessagesFromUser (ID, type, callback) {
    db.query("select c.* , case when c.fromType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = fromID) when c.fromType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = fromID) else (select name from pharmacy where pharmacyID = fromID) end as name_from , case when c.toType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = toID) when c.toType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = toID) else (select name from pharmacy where pharmacyID = toID) end as name_to from chat c where ((fromID = $1 and fromType = $2) OR (toID = $1 and toType = $2))", [ID, type], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveAllMessagesFromTwoParties (fromID, fromType, toID, toType, callback) {
    db.query("select c.* , case when c.fromType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = fromID)	when c.fromType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = fromID) else (select name from pharmacy where pharmacyID = fromID) end as name_from , case when c.toType = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = toID) when c.toType = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = toID) else (select name from pharmacy where pharmacyID = toID) end as name_to from chat c  where (((fromID = $1 and fromType = $2) AND (toID = $3 and toType = $4)) OR ((fromID = $3 and fromType = $4) AND (toID = $1 and toType = $2)))", [fromID, fromType, toID, toType], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insertMessage (fromID, fromType, toID, toType, message, timestamp, callback) {
      db.query('INSERT INTO chat (fromID, fromType, toID, toType, message, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6, $7);', [fromID, fromType, toID, toType, message, timestamp, 'false'], (err, res) => {
      //TODO error handling
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  static retrieveAllPatients (callback) {
    db.query("SELECT patientID as ID, CONCAT(firstname, ' ', lastname) as name from patient", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
    static retrieveAllDoctos (callback) {
    db.query("SELECT doctorID as ID, CONCAT(firstname, ' ', lastname) as name from doctor", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
    static retrieveAllPharmacies (callback) {
    db.query("SELECT pharmacyID as ID, name from pharmacy", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Chat;