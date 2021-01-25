var db = require('../database');

  db.query('DROP TABLE IF EXISTS chat;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE chat (fromID integer NOT NULL, fromType text NOT NULL, toID integer NOT NULL, toType text NOT NULL, message text NOT NULL, timestamp text NOT NULL, read boolean NOT NULL);', (err, res) => { 
         db.query('INSERT INTO chat (fromID, fromType, toID, toType, message, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [1, 'doctor', 1, 'patient', 'Hi Kameron, how are you doint', new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), true ], (err, res) => { })
		 db.query('INSERT INTO chat (fromID, fromType, toID, toType, message, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [1, 'patient', 1, 'doctor', 'Hi Doc, I am good.', new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf(), false], (err, res) => { })
		 db.query('INSERT INTO chat (fromID, fromType, toID, toType, message, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [1, 'pharmacy', 1, 'patient', 'Hi Mr. Lyons, you can pick up your meds.', new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf(), false], (err, res) => { })
    })	
  })