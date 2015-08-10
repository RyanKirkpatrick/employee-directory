var Employee = require('mongoose').model('Employee');

exports.getEmployees = function (req, res) {
	Employee.find({deleted: false}).exec(function (err, collection) {
		res.send(collection);
	});
};

exports.updateEmployee = function (req, res) {
	var employeeUpdates = req.body;
	if (!req.user.hasRole('admin')) {
		res.status(403);
		return res.end();
	}

	Employee.findByIdAndUpdate(employeeUpdates._id, employeeUpdates, function (err) {
		if (err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send('Done');
	});
};