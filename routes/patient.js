var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');

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

//get health status of patient
router.get('/health/:username', (req, res) => {

  let health = {status: 'stable', backgroundColor: '#e0eae1', medication: [], missedMedication: [], pendingMedication: []}
  console.log(req.params.username)
  Patient.retrieveUser(req.params.username, (result) => {


    // if (err)
    //   return res.json({error: true});
    console.log(result[0])
    if(result[0].medication.medication.length == 0) { //patient doesn't need any medication
      return res.json(health)
    }

    health.medication = result[0].medication.medication
    let medication = health.medication

    medication.forEach(med => {
      if(med.history.length == 0){ // new patient about to start taking medication
        let current_date = Number(new Date().valueOf().toString())
        let assigned_on = new Date(med.assigned_on)
        assigned_on.setHours(assigned_on.getHours()+ 24*med.duration)
        //check if user exceeded the assigned period
        if(assigned_on < current_date ){ //86400 is 24 hours in unix time
          console.log('(if) duration exceeded ' + med.title)
          health.missedMedication.push(med)
        } else {
          health.pendingMedication.push(med)
        }

      } else {
        // let history_sorted = med.history.sort((a,b) => (Number(a.assigned_on) > Number(b.assigned_on)) ? 1 : ((Number(b.assigned_on)> Number(a.assigned_on)) ? -1 : 0))
        // let last_entry =  Number(medication_sorted[medication_sorted.length - 1].assigned_on)
        // let current_date = Number(new Date().valueOf().toString())
        // last_entry = new Date(med.last_entry)
        // if(current_date - last_entry > med.duration * 86400){ //86400 is 24 hours in unix time
        //   console.log('(else) duration exceeded ' + med)
        //   health.missedMedication.push(med)
        // }
      }
      
    })

    return res.json(health)
  });
});

router.post('/medication/:username/:title', (req, res) => {

  Patient.retrieveUserMedication(req.params.username, (result) => {
    let medication = result[0].medication.medication
    
    let timestamp = new Date().valueOf().toString()
    medication.forEach(med => {
      if(med.title == req.params.title){
        med.history.push(timestamp)
      }
    })
    console.log(medication)

    Patient.saveUserMedication(req.params.username, {medication: medication}, (errr, resultt) => {
        return res.json({taken: true})
    })

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