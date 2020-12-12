  var db = require('../database');

  db.query('DROP TABLE IF EXISTS medication;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE medication( name text, type text NULL, PRIMARY KEY(name));', (err, res) => { 
    db.query('INSERT INTO medication (name) VALUES ($1);',
		['Methylprednisolon'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Ciclosporin'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Tacrolimus'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Mycophenolatmofetil'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Basiliximab'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Azathioprin'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Everolimus'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Sirolimus'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Glukokortikoide'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Mineralokortikoide'], (err, res) => { })
	db.query('INSERT INTO medication (name) VALUES ($1);',
		['Aldosteron'], (err, res) => { })
		})
 })
