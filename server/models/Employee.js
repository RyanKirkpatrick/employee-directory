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
		pod: {
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
				image: 'johndoe.jpg',
				gender: 'male',
				department: 'Software Engineering',
				title: 'Software Engineer',
				team: 'Prestige Worldwide',
				deskLoc: {
					floor: 6,
					pod: 1,
					pos: '1-1'
				}
			});
			Employee.create({
				name: {
					firstName: 'Jane',
					lastName: 'Doe'
				},
				image: 'janedoe.jpg',
				gender: 'female',
				department: 'Customer Service',
				title: 'Manager',
				deskLoc: {
					floor: 6,
					pod: 1,
					pos: '1-2'
				}
			});
			Employee.create({
				name: {
					firstName: 'Jim',
					lastName: 'Beam'
				},
				image: 'jimbeam.jpg',
				gender: 'male',
				department: 'Software Engineering',
				title: 'Senior Software Engineer',
				team: '00 Agents',
				deskLoc: {
					floor: 6,
					pod: 1,
					pos: '3-6'
				}
			});
			Employee.create({
				name: {
					firstName: 'Sally',
					lastName: 'Ride'
				},
				image: 'sallyride.jpg',
				gender: 'female',
				department: 'People Operations',
				title: 'Intern',
				deskLoc: {
					floor: 6,
					pod: 1,
					pos: '3-1'
				}
			});
		}
	});
}

exports.createDefaultEmployees = createDefaultEmployees;
