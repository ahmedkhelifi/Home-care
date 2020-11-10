const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const encryptPassword = require('encrypt-password')
var db = require('./database');
const WebSocket = require('ws');
// const socket_request = require("./websocket/socket.js");


/*
*
* START: WEBSOCKET FOR LIVE CONCENSUS CONFERENCE
*
*/
const wss = new WebSocket.Server({ port: 5001 })
// socket_request.handle_request(wss, WebSocket)
/*
*
* END: WEBSOCKET FOR LIVE CONCENSUS CONFERENCE
*
*/


app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// app.use(express.static(path.join(__dirname, 'build')));

/*EXTERN API*/

/*INTERN API*/
app.use('/api/login', require('./routes/login'));

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', 'index.html'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', 'index.html'));
// });

// const server = createServer(app)
// server.listen(process.env.PORT || 5000, err => {
//   if(err) throw err
//   console.log('server started')
// })

app.listen(process.env.PORT || 5000);

// console.log('App is listening on port ' + process.env.PORT);
db.query('SELECT NOW()', (err, res) => {
  if (err.error)
    return console.log(err.error);
  console.log(`😎 PostgreSQL connected: ${res[0].now}.`);

  /*
  *
  *
  * FOLLOWING PART IS MANDATORY THE FIRST TIME THE SERVER RUNS ONLY
  * AFTERWARDS OPTINIONAL (TO RESET DB)
  *
  *
  */
  var doctorID = new Date().valueOf().toString()
  db.query('DROP TABLE IF EXISTS Doctor;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE Doctor ( doctorID TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, EMAIL TEXT, adressID TEXT NOT NULL, username  TEXT NOT NULL, password  TEXT NOT NULL );', (err, res) => {
      // var timestamp = new Date().valueOf().toString()
      let firstName = 'David'
      let lastName = 'Thiel'
      let EMAIL = 'thiel@gmail.com'
      let adressID = 'Gneisenaustraße'
      let username = 'd.thiel'
      let password = encryptPassword('123456', 'homecare')
      db.query('INSERT INTO Doctor (doctorID, firstName, lastName , EMAIL, adressID, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7);',[doctorID, firstName, lastName, EMAIL, adressID, username, password], (err, res) => { })
      // var timestamp = new Date().valueOf().toString()
    })
  })
});