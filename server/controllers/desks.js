var Desk = require('mongoose').model('Desk');

exports.getDesks = function (req, res) {
  Desk.find({}).exec(function (err, collection) {
    res.send(collection);
  });
};
