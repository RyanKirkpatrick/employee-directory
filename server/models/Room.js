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
				name: 'Allentown',
				number: '1',
				location: '071810',
				classification: 'allentown meeting',
				xpos: 293,
				ypos: 450
			});
			Room.create({
				floor: 7,
				name: 'Kaisertown',
				number: '2',
				location: '070802',
				classification: 'kaisertown meeting',
				xpos: 9,
				ypos: 823
			});
			Room.create({
				floor: 7,
				name: 'Cobblestone',
				number: '7-1',
				location: '073027',
				classification: 'cobblestone training',
				xpos: 887,
				ypos: 9
			});
			Room.create({
				floor: 7,
				name: 'Canalside',
				number: '7-2',
				location: '073032',
				classification: 'canalside training',
				xpos: 1031,
				ypos: 9
			});
			Room.create({
				floor: 7,
				name: 'Break Room (7)',
				location: '070405',
				classification: 'break7 break',
				xpos: 9,
				ypos: 942
			});
			Room.create({
				floor: 8,
				name: 'Goodell',
				number: '4',
				location: '082814',
				classification: 'goodell meeting',
				xpos: 452,
				ypos: 99
			});
			Room.create({
				floor: 8,
				name: 'Niagara',
				number: '5',
				location: '082416',
				classification: 'niagara meeting',
				xpos: 513,
				ypos: 240
			});
			Room.create({
				floor: 8,
				name: 'Tupper',
				number: 6,
				location: '082419',
				classification: 'tupper meeting',
				xpos: 657,
				ypos: 240
			});
			Room.create({
				floor: 8,
				name: 'Main',
				number: '8',
				location: '081526',
				classification: 'main meeting',
				xpos: 827,
				ypos: 454
			});
			Room.create({
				floor: 8,
				name: 'Erie',
				number: '9',
				location: '081930',
				classification: 'erie meeting',
				xpos: 999,
				ypos: 451
			});
			Room.create({
				floor: 8,
				name: 'Scott',
				number: '10',
				location: '080802',
				classification: 'scott meeting',
				xpos: 9,
				ypos: 826
			});
			Room.create({
				floor: 8,
				name: 'Delaware',
				number: '11',
				location: '080707',
				classification: 'delaware meeting',
				xpos: 177,
				ypos: 854
			});
			Room.create({
				floor: 8,
				name: 'Elmwood',
				number: '12',
				location: '080710',
				classification: 'elmwood meeting',
				xpos: 292,
				ypos: 857
			});
			Room.create({
				floor: 8,
				name: 'Washington',
				number: '13',
				location: '083119',
				classification: 'washington meeting',
				xpos: 630,
				ypos: 9
			});
			Room.create({
				floor: 8,
				name: 'Ontario',
				number: '14',
				location: '081822',
				classification: 'ontario meeting',
				xpos: 723,
				ypos: 481
			});
			Room.create({
				floor: 8,
				name: 'Break Room (8)',
				location: '080305',
				classification: 'break8 break',
				xpos: 9,
				ypos: 942
			});
		}
	});
}

exports.createDefaultRooms = createDefaultRooms;