var mysql = require('mysql');
var Sequelize = require('Sequelize');
var orm = new Sequelize('chat', 'root', '');

var User = orm.define('User', {
  username: Sequelize.STRING
});

var Message = orm.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
})

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;


var conn = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});
conn.connect();


// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
  // user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
  // user: 'root', password: ''
  // OR
  // user: 'root', password: 'some_password_you_created_at_install'


