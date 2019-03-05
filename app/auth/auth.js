var config         = require('../../config.json');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var passport       = require('passport');
var User           = require('../models/User');

var baseUrl = config.httpServer.baseUrl;

// Passport

passport.use(new GoogleStrategy({
	clientID: config.auth.google.clientID,
	clientSecret: config.auth.google.clientSecret,
	callbackURL: baseUrl + '/auth/google/callback',
	userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
	passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		console.log('authenticated');
		var email = profile.email;
		User.findOne({ email: email }, function(err, user) {
			done(err, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// Auth

var webAuth = function(req, res, next) {
	auth(req, function() {
		res.redirect('/login');
	}, function() {
		req.logout();
		res.redirect('/login');
	}, next);
};

var apiAuth = function(req, res, next) {
	auth(req, function() {
		res.sendStatus(401);
	}, function() {
		res.sendStatus(403);
	}, next);
};

var auth = function(req, notAuthenticatedCallback, notAuthorizedCallback, nextCallback) {
	var isAuthenticated = req.isAuthenticated();
	var isAuthorized = isAuthenticated && req.user;

	if(!isAuthenticated){
		console.log('not authenticated');
		notAuthorizedCallback();
	} else if(!isAuthorized){
		console.log('not authorized');
		notAuthorizedCallback();
	} else {
		nextCallback();
	}
};

module.exports.webAuth = webAuth;
module.exports.apiAuth = apiAuth;