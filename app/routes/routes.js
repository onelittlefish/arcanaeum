var app    = require('../app');
var auth   = require('../auth/auth');
var router = require('./apiRoutes');

require('../auth/routes');

app.get('/', auth.webAuth, function(req, res) {
	res.sendFile('/views/root.html', {'root': './'});
});

app.get('/login', function(req, res) {
	res.sendFile('/views/login.html', {'root': './'});
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

app.use('/api', router);