var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	employeeModel = require('../models/Employee'),
	deskModel = require('../models/Desk'),
	roomModel = require('../models/Room'),
	printerModel = require('../models/Printer'),
  artifactModel = require('../models/Artifact');

module.exports = function (config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error…'));
	db.once('open', function callback() {
		console.log('employeedirectory db opened');
	});

	userModel.createDefaultUsers();
	employeeModel.createDefaultEmployees();
	deskModel.createDefaultDesks();
	roomModel.createDefaultRooms();
	printerModel.createDefaultPrinters();
	artifactModel.createDefaultArtifacts();
};