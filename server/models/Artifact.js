var mongoose = require('mongoose');

var artifactSchema = mongoose.Schema({
	location: {
		type: String,
		required: '{PATH} is required!'
	},
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	name: {
		type: String,
		required: '{PATH} is required!'
	},
	orientation: {
		type: String,
		required: '{PATH} is required!'
	},
	classification: {
		type: String,
		required: '{PATH} is required!'
	},
	xpos: {
		type: Number,
		required: '{PATH} is required!'
	},
	ypos: {
		type: Number,
		required: '{PATH} is required!'
	}
});

var Artifact = mongoose.model('Artifact', artifactSchema);

function createDefaultArtifacts() {
	Artifact.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Artifact.create({
				location: 'buf',
				floor: 7,
				name: 'liazon-cafe',
				orientation: 'horz',
				classification: 'liazon-cafe',
				xpos: 542,
				ypos: 968
			});
		}
	});
}

exports.createDefaultArtifacts = createDefaultArtifacts;