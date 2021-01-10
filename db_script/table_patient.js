  var db = require('../database');
  const encryptPassword = require('encrypt-password');

  db.query('DROP TABLE IF EXISTS patient;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE patient(patientid serial NOT NULL,username text NOT NULL,password text NOT NULL,firstname text NOT NULL,lastname text NOT NULL,birthdate date NOT NULL,addressid integer,puls json,weight json,blood_pressure json,temperature json,medication json,PRIMARY KEY (patientid));', (err, res) => {
      //Patient Kameron Lyons hat Gewicht, Blutdruck, Temperatur und Medikamente für jeden erforderlichen Tag eingegeben
	       db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['K.Lyons', encryptPassword('lyons1980', 'homecare'), 'Kameron', 'Lyons', '1980-01-21', 4,
		{ "puls":[
			{"puls": 70 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "weight":[
			{"weight": 75.0 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.3 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.7 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.2 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.9 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.8 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "blood_pressure":[
			{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 123, "bloodpres_sys": 81, "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 125, "bloodpres_sys": 87, "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 130, "bloodpres_sys": 89, "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 122, "bloodpres_sys": 84, "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 126, "bloodpres_sys": 76, "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 128, "bloodpres_sys": 85, "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 125, "bloodpres_sys": 81, "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{"temperature":[
			{"temperature":37.0,"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.7,"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.8,"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.5,"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":37.1,"timestamp": new Date(Date.now() ).valueOf(), measured: true}
			]},
        {"medication": [
            {"title":"Azathioprine","ammount":1,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
            "assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Mycophenolate mofetil","ammount":2,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Cyclophosphamide","ammount":1,"duration":7,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Azathioprine tablets","ammount":2,"duration":4,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()}
			]} 
        ], (err, res) => { })
		//Patient Eryn Whiteley hat in den letzten drei Tagen keine Eingaben gemacht, vergessene Eingabe wurde nicht bestätigt
		      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['E.Whiteley', encryptPassword('whiteley2002', 'homecare'), 'Eryn', 'Whiteley', '2002-09-23', 5,
		{ "puls":[
			{"puls": 70 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": "" , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"puls": "" , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"puls": "" , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{ "weight":[
			{"weight": 75.0 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.3 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.7 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": "" , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"weight": "" , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"weight": "", "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{ "blood_pressure":[
			{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 123, "bloodpres_sys": 81, "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 125, "bloodpres_sys": 87, "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 130, "bloodpres_sys": 89, "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{"temperature":[
			{"temperature":37.0,"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.7,"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":"","timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"temperature":"","timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"temperature":"","timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
        {"medication": [
            {"title":"Azathioprine","ammount":1,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
            "assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Mycophenolate mofetil","ammount":2,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Cyclophosphamide","ammount":1,"duration":7,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Azathioprine tablets","ammount":2,"duration":4,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()}
			]} 
        ], (err, res) => { })
		//Patient Madelyn Arias hat macht unregelmäßige Eingaben, vergessene Eingaben wurde bestätigt
		      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['M.Arias', encryptPassword('arias1965', 'homecare'), 'Madelyn', 'Arias', '1965-04-30', 6,
		{ "puls":[
			{"puls": 70 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": "" , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"puls": 74 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": "" , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"puls": 75 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "weight":[
			{"weight": 75.0 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": "" , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"weight": 74.7 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.2 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": "" , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"weight": 75.8 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "blood_pressure":[
			{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 123, "bloodpres_sys": 81, "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"bloodpres_dia": 130, "bloodpres_sys": 89, "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 122, "bloodpres_sys": 84, "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"bloodpres_dia": 128, "bloodpres_sys": 85, "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 125, "bloodpres_sys": 81, "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{"temperature":[
			{"temperature":37.0,"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":"","timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.8,"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":"","timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":37.1,"timestamp": new Date(Date.now() ).valueOf(), measured: true}
			]},
        {"medication": [
            {"title":"Azathioprine","ammount":1,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
            "assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Mycophenolate mofetil","ammount":2,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Cyclophosphamide","ammount":1,"duration":7,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Azathioprine tablets","ammount":2,"duration":4,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()}
			]} 
			], (err, res) => { })
		//Patient Cecelia Lancaster gibt nur Puls, Gewicht und Temperatur ein, kein Blutdruck und Medikamente
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['C.Lancaster', encryptPassword('lancaster1977', 'homecare'), 'Cecelia', 'Lancaster', '1977-12-08', 7,
		{ "puls":[
			{"puls": 70 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "weight":[
			{"weight": 75.0 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.3 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.7 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.2 , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.9 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.8 , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.1 , "timestamp": new Date(Date.now()).valueOf(), measured: true}
			]},
		{ "blood_pressure":[]},
		{"temperature":[
			{"temperature":37.0,"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.7,"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.8,"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.5,"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":37.1,"timestamp": new Date(Date.now() ).valueOf(), measured: true}
			]},
        {"medication": []} 
			], (err, res) => { })
		//Patient Aliyah Crane gibt nur Medikamente, keine Puls, Gewicht, Blutdruck und Temperatur ein.
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['A.Crane', encryptPassword('crane1985', 'homecare'), 'Aliyah', 'Crane', '1985-02-12', 8,
		{ "puls":[]},
		{ "weight":[]},
		{ "blood_pressure":[]},
		{"temperature":[]},
        {"medication": [
            {"title":"Azathioprine","ammount":1,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
            "assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Mycophenolate mofetil","ammount":2,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Cyclophosphamide","ammount":1,"duration":7,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Azathioprine tablets","ammount":2,"duration":4,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()}
			]} 
		], (err, res) => { })
		//Patient Hamaad Brewer macht unregelmäßige Eingaben, manchmal wird vergessene Eingabe bestätigt (Tag -3, -1), manchmal nicht (Tag -6)
      db.query('INSERT INTO Patient (username, password, firstName, lastName , birthdate, addressid, puls, weight, blood_pressure, temperature, medication) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
		['H.Brewer', encryptPassword('brewer1995', 'homecare'), 'Hamaad', 'Brewer', '1995-10-24', 9,
		{ "puls":[
			{"puls": 70 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 75 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": 74 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": "" , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"puls": 75 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"puls": "" , "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{ "weight":[
			{"weight": 75.0 , "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 75.3 , "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": 74.7 , "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": "" , "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"weight": 75.1 , "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"weight": "", "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{ "blood_pressure":[
			{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 125, "bloodpres_sys": 87, "timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": 130, "bloodpres_sys": 89, "timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"bloodpres_dia": 128, "bloodpres_sys": 81, "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"bloodpres_dia": "", "bloodpres_sys": "", "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
		{"temperature":[
			{"temperature":37.0,"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.7,"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":36.9,"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":"","timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
			{"temperature":36.8,"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
			{"temperature":"","timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
			]},
        {"medication": [
            {"title":"Azathioprine","ammount":1,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
            "assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() ).valueOf(), measured: true}
                ],
				"assigned_on": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Mycophenolate mofetil","ammount":2,"duration":1,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false},
				{"timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Cyclophosphamide","ammount":1,"duration":7,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()},
            {"title":"Azathioprine tablets","ammount":2,"duration":4,"history":[
                {"timestamp": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf(), measured: true},
				{"timestamp": new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), measured: false}
                ],
				"assigned_on":new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).valueOf()}
			]} 
        ], (err, res) => { })
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
