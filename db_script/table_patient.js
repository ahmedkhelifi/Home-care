  var db = require('../database');
  const encryptPassword = require('encrypt-password');

  db.query('DROP TABLE IF EXISTS patient;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE patient(patientid serial NOT NULL,username text NOT NULL,password text NOT NULL,firstname text NOT NULL,lastname text NOT NULL,birthdate date NOT NULL,addressid integer,puls json,weight json,bloodpres_dia json,bloodpres_sys json,temperature json,medication json,PRIMARY KEY (patientid));', (err, res) => {
      
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, medication) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['K.Lyons', encryptPassword('lyons1980', 'homecare'), 'Kameron', 'Lyons', '1980-01-21', 4, {"medication":[]} ], (err, res) => { })

      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid) VALUES ($1, $2, $3, $4, $5, $6);',
		['E.Whiteley', encryptPassword('whiteley2002', 'homecare'), 'Eryn', 'Whiteley', '2002-09-23', 5], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid) VALUES ($1, $2, $3, $4, $5, $6);',
		['M.Arias', encryptPassword('arias1965', 'homecare'), 'Madelyn', 'Arias', '1965-04-30', 6], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['C.Lancaster', encryptPassword('lancaster1977', 'homecare'), 'Cecelia', 'Lancaster', '1977-12-08', 7], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['A.Crane', encryptPassword('crane1985', 'homecare'), 'Aliyah', 'Crane', '1985-02-12', 8], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid) VALUES ($1, $2, $3, $4, $5, $6);',
		['H.Brewer', encryptPassword('brewer1995', 'homecare'), 'Hamaad', 'Brewer', '1995-10-24', 9], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['N.Chester', encryptPassword('chester2010', 'homecare'), 'Niall', 'Chester', '2010-06-17', 10], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid) VALUES ($1, $2, $3, $4, $5, $6);',
		['Z.John', encryptPassword('john1975', 'homecare'), 'Zach', 'John', '1979-05-19', 11], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid) VALUES ($1, $2, $3, $4, $5, $6);',
		['E.Knights', encryptPassword('knights1998', 'homecare'), 'Elis', 'Knights', '1998-09-29', 12], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['P.Flowers', encryptPassword('flowers1990', 'homecare'), 'Phillip', 'Flowers', '1990-08-13', 13], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['P.Montes', encryptPassword('montes1972', 'homecare'), 'Phillip', 'Montes', '1972-11-20', 14], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['D.Markham', encryptPassword('markham1988', 'homecare'), 'Danyl', 'Markham', '1988-03-14', 15], (err, res) => { })  
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['A.Glenn', encryptPassword('glenn2000', 'homecare'), 'Annalise', 'Glenn', '2000-06-22', 16], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['A.Begum', encryptPassword('begum1960', 'homecare'), 'Ariyah', 'Begum', '1960-07-02', 17], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['L.Forrest', encryptPassword('forrest1959', 'homecare'), 'Leonardo', 'Forrest','1959-11-27', 18], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['E.Adamson', encryptPassword('adamson1971', 'homecare'), 'Etienne', 'Adamson', '1971-02-05', 19], (err, res) => { })
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid)  VALUES ($1, $2, $3, $4, $5, $6);',
		['V.Floyd', encryptPassword('floyd1969', 'homecare'), 'Viktoria', 'Floyd', '1969-09-03', 20], (err, res) => { })
    })
  })