var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	title: {
		type: String,
		required: '{PATH} is required!'
	},
	start: {
		type: Date,
		required: '{PATH} is required!'
	},
	end: {
		type: Date
	},
	details: {
		type: String
	},
	className: {
		type: Array
	},
	url: {
		type: String
	},
	location: {
		type: String
	},
	allDay: {
		type: Boolean
	},
	stick: {
		type: Boolean,
		default: true
	},
	deleted: {
		type: Boolean,
		default: false
	}
});

var Event = mongoose.model('Event', eventSchema);

function createDefaultEvents() {
	Event.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Event.create({
				title: 'Bring Your Child to Work Day',
				start: new Date(2016, 3, 28, 9, 0),
				end: new Date(2016, 3, 28, 15, 0),
				details: 'This is more info about the event',
				className: ['event-class'],
				location: 'buf',
				stick: true
			});
		}
	});
}

exports.createDefaultEvents = createDefaultEvents;