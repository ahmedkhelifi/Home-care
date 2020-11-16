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


module.exports = router;