var db = require('../db');
var mysql = require('mysql');




module.exports = {
  getAll: function () {
    var sqlGetAllMessages = `SELECT messages.id, messages.text,messages.room_id, users.username FROM messages left outer join users on (
    messages.user_id = users.id) order by messages.id desc;`;
    db.conn.query(sqlGetAllMessages, (err, response) => {
      callback(response);
    })
    // axios.get('http://127.0.0.1:3000/classes/messages')
    // .then((res) => {

    // })
    // $.ajax({
    //   url: ,
    //   type: 'GET',
    //   data: {},
    //   success: ,
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }, // a function which produces all the messages
  create: function (params, callback) {
    var sqlCreateMessage = `INSERT INTO messages (text, user_id, room_id) VALUES (?, (select id from users where username = ? limit 1), ?);`;
    db.conn.query(sqlCreateMessage, params, (err, response) => {
      callback(response);
    })
    // $.ajax({
    //   url: ,
    //   type: 'POST',
    //   data: {},
    //   success: ,
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
    // `insert into messages (text, user_id, room_id)
    // values (${text}, ${user_id}, ${room_id});`
  } // a function which can be used to insert a message into the database
};
