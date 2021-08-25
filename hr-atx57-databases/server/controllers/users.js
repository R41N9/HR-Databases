var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, response) => {
      res.json(response);
    });
  },
  post: function (req, res) {
    var params = [req.body[username]]
    models.users.create(params, (err, response) => {
      res.json(response);
    })
  }
};
