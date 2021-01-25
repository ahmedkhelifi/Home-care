/*
TODO:

login: Check wether email/username belong to patient, doctor, or apotheke. In the return json, add a new field called type and specify the type of user
Patient: API for patient to add new health stats, or modify existing ones
Doctor: API to modify existing users medicationns and email. Type of  transplant and patients infos cannot be modified by the user

Script, script that runs every 24 hours and adds nnew health stats (not medications yet)
Example of heart rate input would look like: 


[{date: 'today', value: '45'}, {date: 'yesterday', value: '75'},{date: 'some date', value: '50'}]

*/


const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const encryptPassword = require('encrypt-password');
var db = require('./database');
const WebSocket = require('ws');
// const socket_request = require("./websocket/socket.js");

const {createServer} = require('http');

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/login', require('./routes/login'));
app.use('/api/patient', require('./routes/patient'));
app.use('/api/doctor', require('./routes/doctor'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', 'index.html'));
// });

// socket_request.handle_request(wss, WebSocket)

const port = process.env.PORT || 5000;
const server = createServer(app);
server.listen(port, () => console.info(`Server running on port: ${port}`));

const wss = new WebSocket.Server({ server });
// socket_request.handle_request(wss, WebSocket)



// console.log('App is listening on port ' + process.env.PORT);
db.query('SELECT NOW()', (err, res) => {
  if (err.error)
    return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);


  // const table_doctor = require("./db_script/table_doctor.js");
   const table_patient = require("./db_script/table_patient.js");
   const table_chat = require("./db_script/table_chat.js");

  // const table_pharmacy = require("./db_script/table_pharmacy.js");
  // const table_medication = require("./db_script/table_medication.js");
  // const table_patientToDoctor = require("./db_script/table_patientToDoctor.js");
  // const table_address = require("./db_script/table_address.js");

  /*
  *
  *
  * FOLLOWING PART IS MANDATORY THE FIRST TIME THE SERVER RUNS ONLY
  * AFTERWARDS OPTINIONAL (TO RESET DB)
  *
  *
  */
  // var doctorID = new Date().valueOf().toString()
  // db.query('DROP TABLE IF EXISTS Doctor;', (err, res) => {
  //  if (err.error)
  //    return console.log(err.error);
  //   db.query('CREATE TABLE Doctor ( doctorID TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, EMAIL TEXT, adressID TEXT NOT NULL, username  TEXT NOT NULL, password  TEXT NOT NULL );', (err, res) => {
  //     // var timestamp = new Date().valueOf().toString()
  //     let firstName = 'David'
  //     let lastName = 'Thiel'
  //     let EMAIL = 'thiel@gmail.com'
  //     let adressID = 'Gneisenaustraße'
  //     let username = 'd.thiel'
  //     let password = encryptPassword('123456', 'homecare')
  //     db.query('INSERT INTO Doctor (doctorID, firstName, lastName , EMAIL, adressID, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7);',[doctorID, firstName, lastName, EMAIL, adressID, username, password], (err, res) => { })
  //     // var timestamp = new Date().valueOf().toString()
  //   })
  // })

  // db.query('DROP TABLE IF EXISTS Patient;', (err, res) => {
  //  if (err.error)
  //    return console.log(err.error);
  //   db.query('CREATE TABLE Patient ( patientID TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, birthdate TEXT NOT NULL, EMAIL TEXT NOT NULL);', (err, res) => {
  //     // var timestamp = new Date().valueOf().toString()
  //     let email = 'test@gmail.com'
  //     let birthday = '01.01.2000'
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['003948941386', 'Kameron', 'Lyons', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['713593164867', 'Eryn', 'Whiteley', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['245468230922', 'Madelyn', 'Arias', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['597434560261', 'Cecelia', 'Lancaster', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['085838536014', 'Aliyah', 'Crane', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['602186601603', 'Hamaad', 'Brewer', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['754137830502', 'Niall', 'Chester', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['644876243155', 'Zach', 'John', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['468861804531', 'Elis', 'Knights', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['427922574351', 'Phillip', 'Flowers', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['490870301349', 'Phillip', 'Montes', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['631689197410', 'Danyl', 'Markham', birthday, email], (err, res) => { })  
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['618857891047', 'Annalise', 'Glenn', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['891628045547', 'Ariyah', 'Begum', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['316125513133', 'Leonardo', 'Forrest',birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['275102691872', 'Etienne', 'Adamson', birthday, email], (err, res) => { })
  //     db.query('INSERT INTO Patient (patientID, firstName, lastName , birthdate, EMAIL) VALUES ($1, $2, $3, $4, $5);',['855062768563', 'Viktoria', 'Floyd', birthday, email], (err, res) => { })

  //   })
  // })
});
