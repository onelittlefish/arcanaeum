var app      = require('../app');
var passport = require('passport');

app.get('/auth/google', passport.authenticate('google', {
	scope: [
		'email'
	]
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/');
});