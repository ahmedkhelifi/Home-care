const db = require('../database');

class Chat {
  static retrieveAllMessaged (callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID) when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1, case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2 from chat c", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	// type is patient, doctor oder pharmacy
  static retrieveAllMessagesFromUser (ID, type, callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID) when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1ID , case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2ID from chat c where ((chatPartner1ID = $1 and chatPartner1Type = $2) OR (chatPartner2ID = $1 and chatPartner2Type = $2))", [ID, type], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveAllMessagesFromTwoParties (chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID)	when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1ID , case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2ID from chat c  where (((chatPartner1ID = $1 and chatPartner1Type = $2) AND (chatPartner2ID = $3 and chatPartner2Type = $4)) OR ((chatPartner1ID = $3 and chatPartner1Type = $4) AND (chatPartner2ID = $1 and chatPartner2Type = $2)))", [chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insertMessage (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message, callback) {
      db.query('INSERT INTO chat (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message) VALUES ($1, $2, $3, $4, $5, $6, $7);', [chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message], (err, res) => {
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