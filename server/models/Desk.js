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
				seat: 13,
				pos: '1-13',
				orientation: 'horz',
				xpos: 250,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 14,
				pos: '1-14',
				orientation: 'horz',
				xpos: 307,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 15,
				pos: '1-15',
				orientation: 'horz',
				xpos: 364,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 16,
				pos: '1-16',
				orientation: 'horz',
				xpos: 250,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 18,
				pos: '1-18',
				orientation: 'horz',
				xpos: 364,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 19,
				pos: '1-19',
				orientation: 'horz',
				xpos: 103,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 20,
				pos: '1-20',
				orientation: 'horz',
				xpos: 160,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 21,
				pos: '1-21',
				orientation: 'horz',
				xpos: 103,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 22,
				pos: '1-22',
				orientation: 'horz',
				xpos: 160,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 23,
				pos: '1-23',
				orientation: 'horz',
				xpos: 250,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 24,
				pos: '1-24',
				orientation: 'horz',
				xpos: 307,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 25,
				pos: '1-25',
				orientation: 'horz',
				xpos: 364,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 26,
				pos: '1-26',
				orientation: 'horz',
				xpos: 421,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 27,
				pos: '1-27',
				orientation: 'horz',
				xpos: 250,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 28,
				pos: '1-28',
				orientation: 'horz',
				xpos: 307,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 29,
				pos: '1-29',
				orientation: 'horz',
				xpos: 364,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 30,
				pos: '1-30',
				orientation: 'horz',
				xpos: 421,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 31,
				pos: '1-31',
				orientation: 'horz',
				xpos: 103,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 32,
				pos: '1-32',
				orientation: 'horz',
				xpos: 160,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 33,
				pos: '1-33',
				orientation: 'horz',
				xpos: 103,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 35,
				pos: '1-35',
				orientation: 'horz',
				xpos: 250,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 36,
				pos: '1-36',
				orientation: 'horz',
				xpos: 307,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 37,
				pos: '1-37',
				orientation: 'horz',
				xpos: 364,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 38,
				pos: '1-38',
				orientation: 'horz',
				xpos: 421,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 39,
				pos: '1-39',
				orientation: 'horz',
				xpos: 250,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 41,
				pos: '1-41',
				orientation: 'horz',
				xpos: 364,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 42,
				pos: '1-42',
				orientation: 'horz',
				xpos: 421,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 43,
				pos: '1-43',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 183
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 44,
				pos: '1-44',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 1,
				seat: 45,
				pos: '1-45',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 313
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 1,
				pos: '2-1',
				orientation: 'horz',
				xpos: 762,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 2,
				pos: '2-2',
				orientation: 'horz',
				xpos: 819,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 3,
				pos: '2-3',
				orientation: 'horz',
				xpos: 875,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 4,
				pos: '2-4',
				orientation: 'horz',
				xpos: 973,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 5,
				pos: '2-5',
				orientation: 'horz',
				xpos: 1030,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 6,
				pos: '2-6',
				orientation: 'horz',
				xpos: 762,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 7,
				pos: '2-7',
				orientation: 'horz',
				xpos: 819,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 8,
				pos: '2-8',
				orientation: 'horz',
				xpos: 875,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 9,
				pos: '2-9',
				orientation: 'horz',
				xpos: 762,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 10,
				pos: '2-10',
				orientation: 'horz',
				xpos: 819,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 12,
				pos: '2-12',
				orientation: 'horz',
				xpos: 973,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 13,
				pos: '2-13',
				orientation: 'horz',
				xpos: 1030,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 14,
				pos: '2-14',
				orientation: 'horz',
				xpos: 1087,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 15,
				pos: '2-15',
				orientation: 'horz',
				xpos: 1144,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 16,
				pos: '2-16',
				orientation: 'horz',
				xpos: 973,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 17,
				pos: '2-17',
				orientation: 'horz',
				xpos: 1030,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 18,
				pos: '2-18',
				orientation: 'horz',
				xpos: 1087,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 19,
				pos: '2-19',
				orientation: 'horz',
				xpos: 1144,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 20,
				pos: '2-20',
				orientation: 'horz',
				xpos: 762,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 21,
				pos: '2-21',
				orientation: 'horz',
				xpos: 819,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 22,
				pos: '2-22',
				orientation: 'horz',
				xpos: 875,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 23,
				pos: '2-23',
				orientation: 'horz',
				xpos: 762,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 24,
				pos: '2-24',
				orientation: 'horz',
				xpos: 819,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 25,
				pos: '2-25',
				orientation: 'horz',
				xpos: 875,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 26,
				pos: '2-26',
				orientation: 'horz',
				xpos: 973,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 27,
				pos: '2-27',
				orientation: 'horz',
				xpos: 1030,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 28,
				pos: '2-28',
				orientation: 'horz',
				xpos: 1087,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 29,
				pos: '2-29',
				orientation: 'horz',
				xpos: 973,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 30,
				pos: '2-30',
				orientation: 'horz',
				xpos: 1030,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 31,
				pos: '2-31',
				orientation: 'horz',
				xpos: 1087,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 32,
				pos: '2-32',
				orientation: 'horz',
				xpos: 762,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 33,
				pos: '2-33',
				orientation: 'horz',
				xpos: 819,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 34,
				pos: '2-34',
				orientation: 'horz',
				xpos: 875,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 35,
				pos: '2-35',
				orientation: 'horz',
				xpos: 762,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 36,
				pos: '2-36',
				orientation: 'horz',
				xpos: 819,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 38,
				pos: '2-38',
				orientation: 'horz',
				xpos: 973,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 39,
				pos: '2-39',
				orientation: 'horz',
				xpos: 1030,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 40,
				pos: '2-40',
				orientation: 'horz',
				xpos: 973,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				section: 2,
				seat: 41,
				pos: '2-41',
				orientation: 'horz',
				xpos: 1030,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 1,
				pos: '3-1',
				orientation: 'vert',
				xpos: 435,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 2,
				pos: '3-2',
				orientation: 'vert',
				xpos: 454,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 3,
				pos: '3-3',
				orientation: 'vert',
				xpos: 435,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 4,
				pos: '3-4',
				orientation: 'vert',
				xpos: 454,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 5,
				pos: '3-5',
				orientation: 'vert',
				xpos: 435,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 6,
				pos: '3-6',
				orientation: 'vert',
				xpos: 454,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 7,
				pos: '3-7',
				orientation: 'vert',
				xpos: 527,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 8,
				pos: '3-8',
				orientation: 'vert',
				xpos: 546,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 9,
				pos: '3-9',
				orientation: 'vert',
				xpos: 527,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 10,
				pos: '3-10',
				orientation: 'vert',
				xpos: 546,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 11,
				pos: '3-11',
				orientation: 'vert',
				xpos: 527,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 12,
				pos: '3-12',
				orientation: 'vert',
				xpos: 546,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 13,
				pos: '3-13',
				orientation: 'vert',
				xpos: 619,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 14,
				pos: '3-14',
				orientation: 'vert',
				xpos: 638,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 15,
				pos: '3-15',
				orientation: 'vert',
				xpos: 619,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 16,
				pos: '3-16',
				orientation: 'vert',
				xpos: 638,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 17,
				pos: '3-17',
				orientation: 'vert',
				xpos: 619,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 18,
				pos: '3-18',
				orientation: 'vert',
				xpos: 638,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 19,
				pos: '3-19',
				orientation: 'vert',
				xpos: 712,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 20,
				pos: '3-20',
				orientation: 'vert',
				xpos: 731,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 21,
				pos: '3-21',
				orientation: 'vert',
				xpos: 712,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 22,
				pos: '3-22',
				orientation: 'vert',
				xpos: 731,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 23,
				pos: '3-23',
				orientation: 'vert',
				xpos: 712,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 24,
				pos: '3-24',
				orientation: 'vert',
				xpos: 731,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 25,
				pos: '3-25',
				orientation: 'vert',
				xpos: 804,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 26,
				pos: '3-26',
				orientation: 'vert',
				xpos: 804,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				section: 3,
				seat: 31,
				pos: '3-31',
				orientation: 'vert',
				classification: 'manager',
				xpos: 823,
				ypos: 853
			});
		}
	});
}

exports.createDefaultDesks = createDefaultDesks;