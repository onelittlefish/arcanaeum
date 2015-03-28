var auth           = require('./auth/auth');
var bodyParser     = require('body-parser');
var config         = require('../config.json');
var cookieParser   = require('cookie-parser');
var express        = require('express');
var lessMiddleware = require('less-middleware');
var mongoose       = require('mongoose');
var passport       = require('passport');
var path           = require('path');
var session        = require('express-session');

// Connect to db
mongoose.connect(config.db.url);

// App config

var baseUrl = config.httpServer.baseUrl;
var publicPath = path.join(__dirname, '../public');

var app = module.exports = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: config.httpServer.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(lessMiddleware(publicPath));
app.use(express.static(publicPath));

var port = process.env.PORT || config.httpServer.port;

// Routes
require('./routes/routes');

// Start server
app.listen(port);
console.log('Magic happens on port ' + port);
