var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: '{PATH} is required!'
	},
	lastName: {
		type: String,
		required: '{PATH} is required!'
	},
	email: {
		type: String
	},
	phone: {
		type: Number
	},
	ext: {
		type: Number
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
	floor: {
		type: Number
	},
	seat: {
		type: String
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
			Employee.create({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@liazon.com',
				phone: '(212) 123-4567',
				ext: '123',
				gender: 'male',
				department: 'Software Engineering',
				title: 'Software Engineer',
				team: 'Prestige Worldwide',
				location: 'Buffalo',
				floor: 8,
				seat: '083006'
			});
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;