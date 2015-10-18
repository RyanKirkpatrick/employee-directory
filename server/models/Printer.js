var mongoose = require('mongoose');

var printerSchema = mongoose.Schema({
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	name: {
		type: String,
		required: '{PATH} is required!'
	},
	brand: {
		type: String
	},
	model: {
		type: String
	},
	classification: {
		type: String,
		default: 'bw'
	},
	orientation: {
		type: String,
		default: 'horz'
	},
	xpos: {
		type: Number,
		required: '{PATH} is required!'
	},
	ypos: {
		type: Number,
		required: '{PATH} is required!'
	}
});

var Printer = mongoose.model('Printer', printerSchema);

function createDefaultPrinters() {
	Printer.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Printer.create({
				floor: 8,
				name: 'LZB8P1-FAKE123',
				brand: 'Lexmark',
				model: 'FAKE123',
				classification: 'bw',
				orientation: 'horz',
				xpos: 10,
				ypos: 10
			});
		}
	});
}

exports.createDefaultPrinters = createDefaultPrinters;