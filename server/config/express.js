var express      = require('express'),
    stylus       = require('stylus'),
    nib          = require('nib'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    passport     = require('passport'),
    credentials  = require('./credentials'),
    mongoose     = require('mongoose'),
    MongoStore   = require('connect-mongo')(session);

module.exports = function (app, config) {
	function compile(str, path) {
		return stylus(str).set('filename', path).use(nib()).import('nib');
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser(credentials.cookieSecret));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(session({
		secret: credentials.sessionSecret,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({mongooseConnection: mongoose.connection})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath + '/public'));
	app.use('/bower_components', express.static(config.rootPath + '/bower_components'));
};
