var Event = require('mongoose').model('Event');

exports.getEvents = function (req, res) {
	Event.find({deleted: {$ne: true}}).exec(function (err, collection) {
		res.send(collection);
	});
};

exports.createEvent = function (req, res) {
	var eventData = req.body;
	Event.create(eventData, function (err, event) {
		if (err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send(event);
	});
};

exports.updateEvent = function (req, res) {
	var eventUpdates = req.body;
	if (!req.user.hasRole('admin')) {
		res.status(403);
		return res.end();
	}

	Event.findByIdAndUpdate(eventUpdates._id, eventUpdates, function (err, event) {
		if (err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send(event);
	});
};