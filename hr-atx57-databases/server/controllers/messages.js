var models = require('../models');

module.exports = {
  get: function (req, res) {
    Message.findAll( { include: [User] } )
      .complete((err, response) => {
        res.json(response);
      })
    // models.messages.getAll((err, response) => {
    //   res.json(response);
    // });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    User.
    var params = {
      text: req.body[text],
      user_id: req.body[user_id],
      room_id: req.body[room_id]
    }
    Message.create(params)
      .complete((err, response) => {
        res.sendStatus(201);
      })
    // var params = [ req.body[text], req.body[user_id], req.body[room_id] ]
    // models.messages.create(params, (err, response) => {
    //   res.json(response);
    // })
  } // a function which handles posting a message to the database
};

