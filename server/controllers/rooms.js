var Room = require('mongoose').model('Room');

exports.getRooms = function (req, res) {
	Room.find({}).exec(function (err, collection) {
		res.send(collection);
	});
};
