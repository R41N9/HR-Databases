/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var axios = require('axios');
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

       var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    axios.post('http://127.0.0.1:3000/classes/users', {
      username: 'Valjean'
    })
    // Post a message to the node chat server:
    .then(
      function () {

        axios.post('http://127.0.0.1:3000/classes/messages', {
            username: 'Valjean',
            message: 'In mercy\'s name, three days is all I need.',
            roomname: 'Hello'
        })
        .then(
          function () {
            // Now if we look in the database, we should find the
            // posted message there.

            // TODO: You might have to change this test to get all the data from
            // your message table, since this is schema-dependent.
            var queryString = 'SELECT * FROM messages';
            var queryArgs = [];

            dbConnection.query(queryString, queryArgs, function(err, results) {
              if (err) {
                throw err;
              } else {
                // Should have one result:
                expect(results.length).to.equal(1);

                // TODO: If you don't have a column named text, change this test.
                expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

                done();
              }
            });
          }
        )
      }
    )
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
       var queryString = "INSERT INTO messages (text, user_id, room_id) VALUES ('Men like you can never change!', 49, 0);";
       var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      axios.get('http://127.0.0.1:3000/classes/messages')
      .then(function (response) {
          var messageLog = response.data;
          expect(messageLog[0].text).to.equal('Men like you can never change!');
          expect(messageLog[0].room_id).to.equal(0);
          done();
      })
    });
  });
});
