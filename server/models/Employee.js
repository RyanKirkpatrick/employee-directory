var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
	eid: {
		type: Number,
		required: '{PATH} is required!'
	},
	firstName: {
		type: String,
		required: '{PATH} is required!'
	},
	lastName: {
		type: String,
		required: '{PATH} is required!'
	},
	nickname: {
		type: String
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
	department: {
		type: String,
		required: '{PATH} is required!'
	},
	title: {
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
	image: {
		type: String
	},
	hasReports: {
		type: Boolean,
		default: false
	},
	manager: {
		type: Number
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
				eid: 1,
				firstName: 'John',
				lastName: 'Doe',
				nickname: 'Jack',
				email: 'john.doe@liazon.com',
				phone: '(212) 123-4567',
				ext: '123',
				department: 'Software Engineering',
				title: 'Software Engineer',
				team: 'Prestige Worldwide',
				location: 'Buffalo',
				floor: 8,
				seat: '083006',
				hasReports: false,
				manager: 1
			});
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;