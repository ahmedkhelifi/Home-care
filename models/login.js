const db = require('../database');
class login {

  static getUser (username, callback) {
    db.query('SELECT * from Doctor WHERE username = $1', [username], (err, res) => {
    	console.log(err)
    	console.log(res)
      callback(err, res);
    });
  }
}

module.exports = login;