var mongoose = require('mongoose'),
  crypto = require('crypto');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error…'));
  db.once('open', function callback() {
    console.log('employeedirectory db opened');
  });

  var employeeSchema = mongoose.Schema({
    name: {
      firstName: String,
      lastName: String
    },
    gender: String,
    deskLoc: {
      floor: Number,
      pod: Number,
      seat: String
    }
  });
  var Employee = mongoose.model('Employee', employeeSchema);

  /*
  var mongoMessage;
  Employee.findOne({}).exec(function (err, messageDoc) {
    mongoMessage = messageDoc.deskLoc.seat;
  });
  */

  var userSchema = mongoose.Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    username: {
      type: String
    },
    salt: {
      type: String
    },
    hashedPwd: {
      type: String
    },
    roles: {
      type: [String]
    }
  });

  userSchema.methods = {
    authenticate: function (passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
    },
    hasRole: function (role) {
      return this.roles.indexOf(role) > -1;
    }
  };

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'matt');
      User.create({
        firstName: 'Matt',
        lastName: 'C',
        username: 'matt',
        salt: salt,
        hashedPwd: hash,
        roles: ['admin']
      });
      salt = createSalt();
      hash = hashPwd(salt, 'tom');
      User.create({
        firstName: 'Tom',
        lastName: 'K',
        username: 'tom',
        salt: salt,
        hashedPwd: hash,
        roles: []
      });
    }
  });
};

// Create a salt for storing password
function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

// Hash a password using a random salt
function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}
