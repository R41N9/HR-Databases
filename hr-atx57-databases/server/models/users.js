var db = require('../db');




module.exports = {
  getAll: function (callback) {
    var sqlGetAllUsers = `SELECT * FROM users;`;
    db.query(sqlGetAllUsers, function(err, response) {
      callback(response);
    })
  },
  create: function (params, callback) {
    var sqlCreateUser = `INSERT INTO users (username) VALUES (?);`;
    db.query(sqlCreateUser, params, (err, response) => {
      callback(response)
    })
  }
};
