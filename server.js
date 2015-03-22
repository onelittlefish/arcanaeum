var express = require('express');
var session = require('express-session')
var hbs = require('hbs')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var Book = require('./app/models/Book');
var User = require('./app/models/User');

mongoose.connect('mongodb://localhost/books');

// App config

var baseUrl = 'http://localhost:8080';

var app = express();
app.disable('x-powered-by');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'q)29+Bx~LGn?s?){' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

// Passport

passport.use(new GoogleStrategy({
	returnURL: baseUrl + '/auth/google/callback',
	realm: baseUrl
	},
	function(identifier, profile, done) {
		var email = profile.emails[0].value;
		User.findOne({ email: email }, function(err, user) {
			done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {
			// console.log('req: ' + req.user + ", " + req.isAuthenticated());
			res.redirect('/');
		});

// Auth

var webAuth = function(req, res, next) {
	auth(req, function() {
		res.redirect('/login');
	}, function() {
		req.logout();
		res.redirect('/login');
	}, next);
}

var apiAuth = function(req, res, next) {
	auth(req, function() {
		res.sendStatus(401);
	}, function() {
		res.sendStatus(401);
	}, next);
}

var auth = function(req, notAuthenticatedCallback, notAuthorizedCallback, nextCallback) {
	var isAuthenticated = req.isAuthenticated();
	var isAuthorized = isAuthenticated && req.user;

	if(!isAuthenticated){
		console.log("not authenticated");
		notAuthorizedCallback();
	} else if(!isAuthorized){
		console.log("not authorized");
		notAuthorizedCallback();
	} else {
		nextCallback();
	}
}

// Routes 

app.get('/', webAuth, function(req, res) {
	res.render('root', req.user);
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

// Set up API

// Routes

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Request');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Hello.' });
});

// Resources

router.route('/books')
	.all(apiAuth)
	.get(function(req, res) {
		Book.find(function(err, books) {
			if (err) {
				console.log("error: " + err);
				res.send(err);
			}
			res.json(books);
		});
	})
	.post(function(req, res) {
		Book.create(req.body, function(err, book) {
			if (err) {
				console.log("error: " + err);
				res.send(err);
			}
			res.json(book);
		});
	});

router.route('/books/:book_id')
	.all(apiAuth)
	.get(function(req, res) {
		Book.findById(req.params.book_id, function(err, book) {
			if (err) {
				console.log("error: " + err);
				res.send(err);
			}
			res.json(book);
		});
	})
	.put(function(req, res) {
		Book.findByIdAndUpdate(req.params.book_id, req.body, function(err, book) {
			if (err) {
				console.log("error: " + err);
				res.send(err);
			}
			res.json(book);
		});
	})
	.delete(function(req, res) {
		Book.findByIdAndRemove(req.params.book_id, function(err, book) {
			if (err) {
				console.log("error: " + err);
				res.send(err);
			}
			res.json(book);
		});
	});

app.use('/api', router);

// Start server
app.listen(port);
console.log('Magic happens on port ' + port);

// mongod
// node server.js