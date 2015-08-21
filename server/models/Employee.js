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
			Employee.create({
				name: {
					firstName: 'John',
					lastName: 'Doe'
				},
				email: 'john.doe@maestro.com',
				phone: '(716) 555-1212',
				gender: 'male',
				department: 'Software Engineering',
				title: 'Software Engineer',
				team: 'Prestige Worldwide',
				deskLoc: {
					floor: 6,
					section: 1,
					seat: 1,
					pos: '1-1'
				}
			});
			Employee.create({
				name: {
					firstName: 'Jane',
					lastName: 'Doe'
				},
				email: 'jane.doe@maestro.com',
				phone: '(716) 555-1212',
				gender: 'female',
				department: 'Customer Service',
				title: 'Manager',
				deskLoc: {
					floor: 6,
					section: 1,
					seat: 2,
					pos: '1-2'
				}
			});
			Employee.create({
				name: {
					firstName: 'Jim',
					lastName: 'Beam'
				},
				email: 'jim.beam@maestro.com',
				phone: '(716) 555-1212',
				gender: 'male',
				department: 'Software Engineering',
				title: 'Senior Software Engineer',
				team: '00 Agents',
				deskLoc: {
					floor: 6,
					section: 3,
					seat: 6,
					pos: '3-6'
				}
			});
			Employee.create({
				name: {
					firstName: 'Sally',
					lastName: 'Ride'
				},
				email: 'sally.ride@maestro.com',
				phone: '(716) 555-1212',
				gender: 'female',
				department: 'People Operations',
				title: 'Intern',
				deskLoc: {
					floor: 6,
					section: 3,
					seat: 1,
					pos: '3-1'
				}
			});
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;
