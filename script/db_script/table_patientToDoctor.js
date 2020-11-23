  db.query('DROP TABLE IF EXISTS patienToDoctor;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query(
	'CREATE TABLE patientodoctor
		(
			patientid integer NOT NULL,
			doctorid integer NOT NULL,
			validfrom date NOT NULL,
			validto date NOT NULL,
			PRIMARY KEY (patientid, doctorid)
		);'	
    db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['1', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['2', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['3', '3', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['4', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['5', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['6', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['7', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['8', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['9', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['10', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['11', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['12', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['13', '3', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['14', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['15', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['16', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patienToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4, $5);',
		['17', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
  })
