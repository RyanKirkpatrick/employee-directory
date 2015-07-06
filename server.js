var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path).use(nib());
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

mongoose.connect('mongodb://localhost/employeedirectory');
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
  deskLoc: {
    floor: Number,
    pod: Number,
    seat: String
  }
});
var Employee = mongoose.model('Employee', employeeSchema);
var mongoMessage;
Employee.findOne({}).exec(function (err, messageDoc) {
  mongoMessage = messageDoc.deskLoc.seat;
});

app.get('/partials/*', function (req, res) {
  res.render('../../public/app/' + req.params[0]);
});

app.get('*', function (req, res) {
  res.render('index');
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
