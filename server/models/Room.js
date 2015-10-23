var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
	location: {
		type: String,
		required: '{PATH} is required!'
	},
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
	seat: {
		type: String,
		required: '{PATH} is required!',
	},
	classification: {
		type: 'String'
	},
	type: {
		type: String,
		default: 'meeting'
	},
	phone: {
		type: Number
	},
	ext: {
		type: Number
	},
	url: {
		type: String
	},
	ip: {
		type: String
	},
	capacity: {
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
				location: 'buf',
				floor: 7,
				name: 'Break Room',
				number: '123',
				seat: '071810',
				type: 'meeting',
				phone: '5551212',
				ext: '123',
				url: 'http://testing',
				ip: '123.456.789.0',
				capacity: '20',
				xpos: 10,
				ypos: 10
			});
		}
	});
}

exports.createDefaultRooms = createDefaultRooms;