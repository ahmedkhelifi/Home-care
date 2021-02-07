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
const socket_request = require("./websocket/socket.js");
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
app.use('/api/chat', require('./routes/chat'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', 'index.html'));
// });

// socket_request.handle_request(wss, WebSocket)

const port = process.env.PORT || 5000;
const server = createServer(app);
server.listen(port, () => console.info(`Server running on port: ${port}`));


const wss = new WebSocket.Server({ server });
socket_request.handle_request(wss, WebSocket)


//test.test_function(server)
// console.log('App is listening on port ' + process.env.PORT);
db.query('SELECT NOW()', (err, res) => {
  if (err.error)
    return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
  
  /*
  *
  *
  * FOLLOWING PART IS MANDATORY THE FIRST TIME THE SERVER RUNS ONLY
  * AFTERWARDS OPTINIONAL (TO RESET DB)
  *
  *
  */

  // const table_doctor = require("./db_script/table_doctor.js");
   const table_patient = require("./db_script/table_patient.js");
   const table_chat = require("./db_script/table_chat.js");
  // const table_pharmacy = require("./db_script/table_pharmacy.js");
  // const table_patientToDoctor = require("./db_script/table_patientToDoctor.js"); // at the moment not in use, maybe for future work
  // const table_address = require("./db_script/table_address.js"); // at the moment not in use, maybe for future work


});
