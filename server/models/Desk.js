var mongoose = require('mongoose');

var deskSchema = mongoose.Schema({
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	section: {
		type: Number,
		required: '{PATH} is required!'
	},
	seat: {
		type: Number,
		required: '{PATH} is required!'
	},
	pos: {
		type: String,
		required: '{PATH} is required!'
	},
	orientation: {
		type: String,
		required: '{PATH} is required!'
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
				floor: 6,
				section: 1,
				seat: 1,
				pos: '1-1',
				orientation: 'horz',
				xpos: 9,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 2,
				pos: '1-2',
				orientation: 'horz',
				xpos: 63,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 3,
				pos: '1-3',
				orientation: 'horz',
				xpos: 9,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 4,
				pos: '1-4',
				orientation: 'horz',
				xpos: 63,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 5,
				pos: '1-5',
				orientation: 'horz',
				xpos: 185,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 6,
				pos: '1-6',
				orientation: 'horz',
				xpos: 239,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 7,
				pos: '1-7',
				orientation: 'horz',
				xpos: 185,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 8,
				pos: '1-8',
				orientation: 'horz',
				xpos: 239,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 9,
				pos: '1-9',
				orientation: 'horz',
				xpos: 36,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 10,
				pos: '1-10',
				orientation: 'horz',
				xpos: 90,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 11,
				pos: '1-11',
				orientation: 'horz',
				xpos: 36,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				section: 1,
				seat: 12,
				pos: '1-12',
				orientation: 'horz',
				xpos: 90,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 1,
				pos: '2-1',
				orientation: 'horz',
				xpos: 378,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 2,
				pos: '2-2',
				orientation: 'horz',
				xpos: 432,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 3,
				pos: '2-3',
				orientation: 'horz',
				xpos: 486,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 4,
				pos: '2-4',
				orientation: 'horz',
				xpos: 378,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 5,
				pos: '2-5',
				orientation: 'horz',
				xpos: 432,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 6,
				pos: '2-6',
				orientation: 'horz',
				xpos: 486,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 7,
				pos: '2-7',
				orientation: 'horz',
				xpos: 412,
				ypos: 151
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 8,
				pos: '2-8',
				orientation: 'horz',
				xpos: 466,
				ypos: 151
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 9,
				pos: '2-9',
				orientation: 'horz',
				xpos: 412,
				ypos: 174
			});
			Desk.create({
				floor: 6,
				section: 2,
				seat: 10,
				pos: '2-10',
				orientation: 'horz',
				xpos: 466,
				ypos: 174
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 1,
				pos: '3-1',
				orientation: 'vert',
				xpos: 630,
				ypos: 9
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 2,
				pos: '3-2',
				orientation: 'vert',
				xpos: 630,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 3,
				pos: '3-3',
				orientation: 'vert',
				xpos: 705,
				ypos: 13
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 4,
				pos: '3-4',
				orientation: 'vert',
				xpos: 728,
				ypos: 13
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 5,
				pos: '3-5',
				orientation: 'vert',
				xpos: 705,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				section: 3,
				seat: 6,
				pos: '3-6',
				orientation: 'vert',
				xpos: 728,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 1,
				pos: '4-1',
				orientation: 'vert',
				xpos: 833,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 2,
				pos: '4-2',
				orientation: 'vert',
				xpos: 856,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 3,
				pos: '4-3',
				orientation: 'vert',
				xpos: 833,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 4,
				pos: '4-4',
				orientation: 'vert',
				xpos: 856,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 5,
				pos: '4-5',
				orientation: 'vert',
				xpos: 919,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				section: 4,
				seat: 6,
				pos: '4-6',
				orientation: 'vert',
				xpos: 919,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 1,
				pos: '5-1',
				orientation: 'horz',
				xpos: 947,
				ypos: 45
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 2,
				pos: '5-2',
				orientation: 'horz',
				xpos: 1001,
				ypos: 45
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 3,
				pos: '5-3',
				orientation: 'horz',
				xpos: 947,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 4,
				pos: '5-4',
				orientation: 'horz',
				xpos: 1001,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 5,
				pos: '5-5',
				orientation: 'horz',
				xpos: 947,
				ypos: 135
			});
			Desk.create({
				floor: 6,
				section: 5,
				seat: 6,
				pos: '5-6',
				orientation: 'horz',
				xpos: 1001,
				ypos: 135
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 1,
				pos: '1-1',
				orientation: 'horz',
				xpos: 160,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 2,
				pos: '1-2',
				orientation: 'horz',
				xpos: 160,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 3,
				pos: '1-3',
				orientation: 'horz',
				xpos: 250,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 4,
				pos: '1-4',
				orientation: 'horz',
				xpos: 307,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 5,
				pos: '1-5',
				orientation: 'horz',
				xpos: 364,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 6,
				pos: '1-6',
				orientation: 'horz',
				xpos: 250,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 7,
				pos: '1-7',
				orientation: 'horz',
				xpos: 307,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 8,
				pos: '1-8',
				orientation: 'horz',
				xpos: 364,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 9,
				pos: '1-9',
				orientation: 'horz',
				xpos: 103,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 10,
				pos: '1-10',
				orientation: 'horz',
				xpos: 160,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 11,
				pos: '1-11',
				orientation: 'horz',
				xpos: 103,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 12,
				pos: '1-12',
				orientation: 'horz',
				xpos: 250,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 13,
				pos: '1-13',
				orientation: 'horz',
				xpos: 307,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 14,
				pos: '1-14',
				orientation: 'horz',
				xpos: 364,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 15,
				pos: '1-15',
				orientation: 'horz',
				xpos: 250,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 16,
				pos: '1-16',
				orientation: 'horz',
				xpos: 364,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 17,
				pos: '1-17',
				orientation: 'horz',
				xpos: 103,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 18,
				pos: '1-10',
				orientation: 'horz',
				xpos: 160,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 19,
				pos: '1-19',
				orientation: 'horz',
				xpos: 103,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 20,
				pos: '1-20',
				orientation: 'horz',
				xpos: 250,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 21,
				pos: '1-21',
				orientation: 'horz',
				xpos: 307,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 22,
				pos: '1-22',
				orientation: 'horz',
				xpos: 364,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 23,
				pos: '1-23',
				orientation: 'horz',
				xpos: 421,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 24,
				pos: '1-24',
				orientation: 'horz',
				xpos: 250,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 25,
				pos: '1-25',
				orientation: 'horz',
				xpos: 307,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 26,
				pos: '126',
				orientation: 'horz',
				xpos: 364,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 27,
				pos: '127',
				orientation: 'horz',
				xpos: 421,
				ypos: 283
			});
		}
	});
}

exports.createDefaultDesks = createDefaultDesks;
