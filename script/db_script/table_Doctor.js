  db.query('DROP TABLE IF EXISTS doctor;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query(
	'CREATE TABLE doctor
		(
			doctorid serial NOT NULL,
			username text NOT NULL,
			password text NOT NULL,
			firstname text NOT NULL,
			lastname text NOT NULL,
			addressid integer NOT NULL,
			PRIMARY KEY (doctorid)
		);'	
	  //'CREATE TABLE Doctor ( doctorID TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, EMAIL TEXT, adressID TEXT NOT NULL, username  TEXT NOT NULL, password  TEXT NOT NULL );', (err, res) => {
      //let firstName = 'David'
      //let lastName = 'Thiel'
      //let EMAIL = 'thiel@gmail.com'
      //let adressID = '1'
      //let username = 'd.thiel'
      //let password = encryptPassword('123456', 'homecare')
    db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
		['d.thiel', encryptPassword('123456', 'homecare'), 'David', 'Thiel', '1'], (err, res) => { })
	db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
		['a.klein', encryptPassword('654123', 'homecare'), 'Angelika', 'Klein', '2'], (err, res) => { })
	db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
		['s.afzal', encryptPassword('654321', 'homecare'), 'Shazia', 'Afzal', '3'], (err, res) => { })
    })
  })
