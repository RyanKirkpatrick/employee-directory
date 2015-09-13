var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	name: {
		type: String,
		required: '{PATH} is required!'
	},
	number: {
		type: String
	},
	location: {
		type: String,
		required: '{PATH} is required!',
	},
	classification: {
		type: 'String',
		default: 'meeting'
	},
	phone: {
		type: Number
	},
	ext: {
		type: Number
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

var Room = mongoose.model('Room', roomSchema);

function createDefaultRooms() {
	Room.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Room.create({
				floor: 7,
				name: 'Break Room',
				number: '123',
				location: '071810',
				classification: 'meeting',
				phone: '5551212',
				ext: '123',
				xpos: 10,
				ypos: 10
			});
		}
	});
}

exports.createDefaultRooms = createDefaultRooms;