var db = require('../database');

  db.query('DROP TABLE IF EXISTS chat;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE chat (chatID text NOT NULL, chatName text NOT NULL, chatPartner1ID integer NOT NULL, chatPartner1Type text NOT NULL, chatPartner2ID integer NOT NULL, chatPartner2Type text NOT NULL, message json);', (err, res) => { 
         db.query('INSERT INTO chat (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), 'blood pres', 1, 'doctor', 1, 'patient', 
		  {message: [
			{message: 'Hi Doc, can I come around on monday?', "timestamp":  new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), fromID: 1, fromType: 'patient', read: true},
			{message: 'Hi Doc, please answer', "timestamp": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), fromID: 1, fromType: 'patient', read: true},
			{message: 'Hi Kameron, yes I will be here', "timestamp": new Date(Date.now()).valueOf(), fromID: 1, fromType: 'doctor', read: true}
		  ]}
		  ], (err, res) => { })
		 db.query('INSERT INTO chat (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), 'order', 1, 'patient', 2, 'pharmacy', 
		  {message: [
			{message: 'Hi, I would like to order Azathioprine', "timestamp":  new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).valueOf(), fromID: 1, fromType: 'patient', read: true},
			{message: 'It is here, you can pick it up.', "timestamp": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).valueOf(), fromID: 2, fromType: 'pharmacy', read: false}
		  ]}
		  ], (err, res) => { })
		 db.query('INSERT INTO chat (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, message) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).valueOf(), 'missing data', 2, 'patient', 1, 'doctor', 
		  {message: [
			{message: 'Hi Eryn, why didnt you insert data for yesterday?', "timestamp":  new Date(Date.now() - 1  * 24 * 60 * 60 * 1000).valueOf(), fromID: 1, fromType: 'doctor', read: true},
			{message: 'It is here, you can pick it up.', "timestamp": new Date(Date.now()).valueOf(), fromID: 2, fromType: 'patient', read: false}
		  ]}
		  ], (err, res) => { })
    })	
  })