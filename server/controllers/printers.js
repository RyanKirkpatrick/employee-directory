var Printer = require('mongoose').model('Printer');

exports.getPrinters = function (req, res) {
	Printer.find({}).exec(function (err, collection) {
		res.send(collection);
	});
};