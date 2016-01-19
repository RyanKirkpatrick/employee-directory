var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
	eid: {
		type: Number,
		required: '{PATH} is required!',
		unique: true
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
		type: String,
		unique: true
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
	guilds: {
		type: [String]
	},
	committees: {
		type: [String]
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
	mid: {
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
				phone: '2121234567',
				ext: '123',
				department: 'Software Engineering',
				title: 'Software Engineer',
				team: 'Prestige Worldwide',
				location: 'Buffalo',
				floor: 8,
				seat: '083006',
				hasReports: false,
				mid: 1
			});
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;