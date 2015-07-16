var mongoose = require('mongoose'),
  userModel = require('../models/User');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error…'));
  db.once('open', function callback() {
    console.log('employeedirectory db opened');
  });

  userModel.createDefaultUsers();

  var employeeSchema = mongoose.Schema({
    name: {
      firstName: String,
      lastName: String
    },
    gender: String,
    deskLoc: {
      floor: Number,
      pod: Number,
      seat: String
    }
  });
  var Employee = mongoose.model('Employee', employeeSchema);

  /*
  var mongoMessage;
  Employee.findOne({}).exec(function (err, messageDoc) {
    mongoMessage = messageDoc.deskLoc.seat;
  });
  */
};
