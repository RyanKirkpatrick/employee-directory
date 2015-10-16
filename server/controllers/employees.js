var Employee   = require('mongoose').model('Employee'),
    formidable = require('formidable'),
    fs         = require('fs'),
    path       = require('path');

exports.getEmployees = function (req, res) {
	Employee.find({deleted: false}).exec(function (err, collection) {
		res.send(collection);
	});
};

exports.createEmployee = function (req, res) {
	var employeeData = req.body;
	Employee.create(employeeData, function (err, employee) {
		if (err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send(employee);
	});
};

exports.updateEmployee = function (req, res) {
	var employeeUpdates = req.body;
	if (!req.user.hasRole('admin')) {
		res.status(403);
		return res.end();
	}

	Employee.findByIdAndUpdate(employeeUpdates._id, employeeUpdates, function (err, employee) {
		if (err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send(employee);
	});
};

exports.uploadEmployeePhoto = function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var oldPath  = files.file.path,
        fileName = fields.fileName,
        fileSize = files.file.size,
        fileSizeLimit = 300000,
        newPath  = path.join(path.normalize(__dirname + '/../../'), '/public/images/employee-photos/', fileName);
		if (fileSize > fileSizeLimit) {
			return res.send({
				reason: 'Photo is too big.  Must be less than ' + fileSizeLimit + ' bytes.'
			});
		}

		fs.readFile(oldPath, function (err, data) {
			fs.writeFile(newPath, data, function (err) {
				fs.unlink(oldPath, function (err) {
					if (err) {
						res.status(500);
						res.json({'success': false});
					} else {
						res.status(200);
						res.json({'success': true});
					}
				});
			});
		});
	});
};