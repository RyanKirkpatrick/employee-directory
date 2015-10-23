var mongoose = require('mongoose');

var deskSchema = mongoose.Schema({
	location: {
		type: String,
		required: '{PATH} is required!'
	},
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	seat: {
		type: String,
		required: '{PATH} is required!'
	},
	orientation: {
		type: String,
		required: '{PATH} is required!'
	},
	classification: {
		type: String,
		required: '{PATH} is required!',
		default: 'employee'
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

var Desk = mongoose.model('Desk', deskSchema);

function createDefaultDesks() {
	Desk.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Desk.create({
				location: 'buf',
				floor: 6,
				seat: '1-1',
				orientation: 'horz',
				xpos: 9,
				ypos: 63
			});
		}
	});
}

exports.createDefaultDesks = createDefaultDesks;