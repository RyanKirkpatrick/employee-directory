var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: '{PATH} is required!'
	},
	lastName: {
		type: String,
		required: '{PATH} is required!'
	},
	username: {
		type: String,
		required: '{PATH} is required!',
		unique: true
	},
	salt: {
		type: String,
		required: '{PATH} is required!'
	},
	hashedPwd: {
		type: String,
		required: '{PATH} is required!'
	},
	roles: [String]
});

userSchema.methods = {
	authenticate: function (passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
	},
	hasRole: function (role) {
		return this.roles.indexOf(role) > -1;
	}
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'matt');
			User.create({
				firstName: 'Matt',
				lastName: 'C',
				username: 'matt',
				salt: salt,
				hashedPwd: hash,
				roles: ['super-admin', 'admin']
			});
		}
	});
}

exports.createDefaultUsers = createDefaultUsers;
