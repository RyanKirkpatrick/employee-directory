var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
	name: {
		firstName: {
			type: String,
			required: '{PATH} is required!'
		},
		lastName: {
			type: String,
			required: '{PATH} is required!'
		}
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	ext: {
		type: String
	},
	image: {
		type: String
	},
	gender: {
		type: String,
		required: '{PATH} is required!'
	},
	title: {
		type: String,
		required: '{PATH} is required!'
	},
	department: {
		type: String,
		required: '{PATH} is required!'
	},
	team: {
		type: String
	},
	location: {
		type: String
	},
	deskLoc: {
		floor: {
			type: Number
		},
		section: {
			type: Number
		},
		seat: {
			type: Number
		},
		pos: {
			type: String
		}
	},
	deleted: {
		type: Boolean,
		default: false
	}
});

var Employee = mongoose.model('Employee', employeeSchema);

function createDefaultEmployees() {
	Employee.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			// replace with good stuff
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;