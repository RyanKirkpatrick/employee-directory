var mongoose = require('mongoose');

var deskSchema = mongoose.Schema({
	floor: {
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
				pos: '1-1',
				orientation: 'horz',
				xpos: 36,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				pos: '1-2',
				orientation: 'horz',
				xpos: 90,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				pos: '1-3',
				orientation: 'horz',
				xpos: 36,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				pos: '1-4',
				orientation: 'horz',
				xpos: 90,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				pos: '1-5',
				orientation: 'horz',
				xpos: 185,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				pos: '1-6',
				orientation: 'horz',
				xpos: 239,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				pos: '1-7',
				orientation: 'horz',
				xpos: 185,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				pos: '1-8',
				orientation: 'horz',
				xpos: 239,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				pos: '1-9',
				orientation: 'horz',
				xpos: 36,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				pos: '1-10',
				orientation: 'horz',
				xpos: 90,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				pos: '1-11',
				orientation: 'horz',
				xpos: 36,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				pos: '1-12',
				orientation: 'horz',
				xpos: 90,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				pos: '3-1',
				orientation: 'vert',
				xpos: 669,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				pos: '3-2',
				orientation: 'vert',
				xpos: 692,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				pos: '3-3',
				orientation: 'vert',
				xpos: 669,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				pos: '3-4',
				orientation: 'vert',
				xpos: 692,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				pos: '3-5',
				orientation: 'vert',
				xpos: 759,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				pos: '3-6',
				orientation: 'vert',
				xpos: 759,
				ypos: 72
			});
		}
	});
}

exports.createDefaultDesks = createDefaultDesks;
