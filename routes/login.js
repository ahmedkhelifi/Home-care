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

  login.getUser(username, (err, result) => {
    if (err.error) {
      console.log('error')
      return res.json({'authenticated': false});
    }

    // if( result.type === doctor){
    //   zweite query then callback
    // }


    if(result.length == 0) {
      return res.json({'authenticated': false});
    }

    if(encryptPassword(password, 'homecare') != result[0].password) {
      return res.json({'authenticated': false});
    }

    return res.json({'authenticated': true, user: {doctorid: result[0].doctorid, username: result[0].username, name:result[0].firstName + ' ' + result[0].lastName }})
    
    
  });

});





module.exports = router;