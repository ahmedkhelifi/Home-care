var express = require('express');
var login = require('../models/login');

var router = express.Router();

const encryptPassword = require('encrypt-password')

router.post('/', (req, res) => {
  console.log('login')
 var username = req.body.username.toLowerCase();
 var password = req.body.password;
 // return res.json({'authenticated': true});
 
 if (password.length < 6) {
   return res.json({'authenticated': false});
 }

  login.getType(username, (err, result) => {
    if (err.error) {
      console.log('error');
      return res.json({'authenticated': false});
    }

    /*doctor logs in*/
    if(result.type === 'doctor'){
        login.getDoctor(username, (err, resultt) => {
            if (err.error) {
                console.log('error');
                return res.json({'authenticated': false});
            }
            console.log('check1')

            if(encryptPassword(password, 'homecare') != resultt[0].password) {
              return res.json({'authenticated': false});
            }

            return res.json({'authenticated': true, user: {doctorid: resultt[0].doctorid, username: resultt[0].username, name:resultt[0].firstName + ' ' + resultt[0].lastName }});

    })}

      /*patient logs in*/
     if( result.type === 'patient'){
          login.getPatient(username, (err, resultt) => {
              if (err.error) {
                  console.log('error')
                  return res.json({'authenticated': false});
              }

          if(encryptPassword(password, 'homecare') != resultt[0].password) {
              return res.json({'authenticated': false});
          }

          return res.json({'authenticated': true, user: {patientid: resultt[0].patientid, username: resultt[0].username, name:resultt[0].firstName + ' ' + resultt[0].lastName }});

      })}

      /*pharmacy logs in*/
      if( result.type === 'pharmacy'){
          login.getPharmacy(username, (err, resultt) => {
              if (err.error) {
                  console.log('error')
                  return res.json({'authenticated': false});
              }

          if(encryptPassword(password, 'homecare') != resultt[0].password) {
              return res.json({'authenticated': false});
          }

          return res.json({'authenticated': true, user: {pharmacyid: resultt[0].pharmacyid, username: resultt[0].username, name:resultt[0].name }});

      })}

  });

});

module.exports = router;