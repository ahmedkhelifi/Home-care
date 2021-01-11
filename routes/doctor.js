var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');

router.get('/getPatients', (req, res) => {
  Patient.retrieveAll((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.post('/addPatient', (req, res) => {

  // retrieve user information from request
  var firstName    = req.body.firstname;
  var LastName     = req.body.lastname;
  var email        = req.body.email;
  var birthdate    = req.body.birthdate;
  var username     = req.body.username;
  var password     = req.body.password;
  var medication  = req.body.medication;

  var timestamp = new Date().valueOf().toString()
  medication.forEach(medicament => {
    if(!medicament.hasOwnProperty('assigned_on')){
      medicament.assigned_on = timestamp
    }
  })

  let medication_json = {medication: medication}

    //forward request to the model
    Patient.insert(firstName, LastName, email, birthdate, username, encryptPassword(password, 'homecare'), medication_json, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
});

router.post('/medication', (req, res) => {

  var medication = req.body.medication;

  Patient.insert(medication, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


module.exports = router;