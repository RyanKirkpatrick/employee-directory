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
		},
	},
	gender: {
		type: String,
		required: '{PATH} is required!'
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
				gender: 'male',
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
				gender: 'female',
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
				gender: 'male',
				deskLoc: {
					floor: 6,
					pod: 1,
					pos: '2-6'
				}
			});
			Employee.create({
				name: {
					firstName: 'Sally',
					lastName: 'Ride'
				},
				gender: 'female',
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
