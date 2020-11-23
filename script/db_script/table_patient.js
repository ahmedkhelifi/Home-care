  db.query('DROP TABLE IF EXISTS patient;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query(
	'	'CREATE TABLE patient
		(
			patientid serial NOT NULL,
			accessid serial NOT NULL,
			firstname text NOT NULL,
			lastname text NOT NULL,
			birthdate date NOT NULL,
			addressid integer NOT NULL,
			puls json,
			weight json,
			bloodpres_dia json,
			bloodpres_sys json,
			temperature json,
			medication json,
			PRIMARY KEY (patientid)
		);'	
	//'CREATE TABLE Patient ( patientID TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, birthdate TEXT NOT NULL, EMAIL TEXT NOT NULL);', (err, res) => {
      // var timestamp = new Date().valueOf().toString()
      //let email = 'test@gmail.com'
      //let birthday = '01.01.2000'
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Kameron', 'Lyons', '1980-01-21', 4, ], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Eryn', 'Whiteley', '2002-09-23', 5], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Madelyn', 'Arias', '1965-04-30', 6], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Cecelia', 'Lancaster', '1977-12-08', 7], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Aliyah', 'Crane', '1985-02-12', 8], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Hamaad', 'Brewer', '1995-10-24', 9], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Niall', 'Chester', '2010-06-17', 10], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Zach', 'John', '1979-05-19', 11], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/) VALUES ($1, $2, $3, $4, $5);',
		['Elis', 'Knights', '1998-09-29', 12], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Phillip', 'Flowers', '1990-08-13', 13], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Phillip', 'Montes', '1972-11-20', 14], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Danyl', 'Markham', '1988-03-14', 15], (err, res) => { })  
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Annalise', 'Glenn', '2000-06-22', 16], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Ariyah', 'Begum', '1960-07-02', 17], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Leonardo', 'Forrest','1959-11-27', 18], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Etienne', 'Adamson', '1971-02-05', 19], (err, res) => { })
      db.query('INSERT INTO Patient (firstName, lastName , birthdate, addressid/*, puls, weight, bloodpres_dia, bloodpres_sys, temperature, medication*/)  VALUES ($1, $2, $3, $4, $5);',
		['Viktoria', 'Floyd', '1969-09-03', 20], (err, res) => { })
    })
  })