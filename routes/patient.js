var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();

router.get('/', (req, res) => {
  Patient.retrieveAll((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.post('/', (req, res) => {

  // retrieve user information from request
  var firstName    = req.body.firstname;
  var LastName     = req.body.lastname;
  var email        = req.body.email;
  var birthdate    = req.body.birthdate;
  var username     = req.body.username;
  var password     = req.body.password;
  var advice       = req.body.advice;

    //forward request to the model
    Patient.insert(firstName, LastName, email, birthdate, username, password, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
});

router.post('/puls', (req, res) => {

  var puls = req.body.puls;

  Patient.insert(puls, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/weight', (req, res) => {

  var weight = req.body.weight;

  Patient.insert(weight, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/bloodpres_dia', (req, res) => {

  var bloodpres_dia = req.body.bloodpres_dia;

  Patient.insert(bloodpres_dia, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/bloodpres_sys', (req, res) => {

  var bloodpres_sys = req.body.bloodpres_sys;

  Patient.insert(bloodpres_sys, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/temperature', (req, res) => {

  var temperature = req.body.temperature;

  Patient.insert(temperature, (err, result) => {
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