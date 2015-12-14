var Artifact = require('mongoose').model('Artifact');

exports.getArtifacts = function (req, res) {
	Artifact.find({}).exec(function (err, collection) {
		res.send(collection);
	});
};