var Employee = require('mongoose').model('Employee');

exports.getEmployees = function (req, res) {
  Employee.find({}).exec(function (err, collection) {
    res.send(collection);
  });
};
