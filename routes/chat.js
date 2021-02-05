var express = require('express');
var Patient = require('../models/patient');
var Chat = require('../models/chat');
var router = express.Router();


//get all messages from database
router.get('/getAllChatrooms', (req, res) => {
  Patient.retrieveAllChatrooms((messages) => {
    return res.json(messages);
  });
});

//get all messages from one person (sent and received)
router.get('/getAllChatroomsFromUser/:id/:type', (req, res) => { // WAS IST HIER DAS ROUTING?

  let messages = {id: req.params.id, type: req.params.type}
  //console.log(req.params.id, req.params.type )
  Chat.retrieveAllChatroomsFromUser (req.params.id, req.params.type, (result) => {
    return res.json(messages)
  });
});


//get all messages from two parties --> maybe we dont need this
router.get('/getAllChatroomsFromTwoParties/:fromID/:fromType/:toID/:toType', (req, res) => { // WAS IST HIER DAS ROUTING?

  let messages = {fromID: req.params.fromID, fromType: req.params.fromType, toID: req.params.toID, toType: req.params.toType}
  //console.log(req.params.fromID, req.params.fromType, req.params.toID, req.params.toType)
  Chat.retrieveAllChatroomsFromTwoParties (req.params.fromID, req.params.fromType, req.params.toID, req.params.toType, (result) => {
    return res.json(messages)
  });
});


//insert message into database
router.post('/newMessage/:fromID/:fromType/:toID/:toType/:message/:timestamp', (req, res) => {
  Chat.insertMessage(req.params.fromID, req.params.fromType, req.params.toID, req.params.toType, req.params.message, req.params.timestamp, (errr, resultt) => {
        return res.json({timestamp: req.params.timestamp, send: true}) 
    })

  });



// get IDs and names from all patients
router.get('/getPatients', (req, res) => {
  Chat.retrieveAllPatients((users) => {

    users.forEach( user => {
		user.type = 'patient' // braucht ihr den Type?
		// what to do?
    })

    return res.json(users);
  });
});

// get IDs and names from all patients
router.get('/getDoctors', (req, res) => {
  console.log('/getDoctors')
  Chat.retrieveAllDoctos((users) => {

  //   users.forEach( user => {
		// user.type = 'doctor'  // braucht ihr den Type?
		// // what to do?
  //   })

    return res.json(users);
  });
});

// get IDs and names from all patients
router.get('/getPatients', (req, res) => {
  Chat.retrieveAllPharmacies((users) => {

    users.forEach( user => {
		user.type = 'pharmacy'  // braucht ihr den Type?
		// what to do?
    })

    return res.json(users);
  });
});

module.exports = router;