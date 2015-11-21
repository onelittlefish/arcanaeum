requirejs.config({
	paths: {
		'backbone'   : 'lib/backbone-1.2.3',
		'underscore' : 'lib/lodash',
		'jquery'     : 'lib/jquery-2.1.1.min'
	}
});

define(function(require) {
	var Book     = require('models/Book');
	var User     = require('models/User');
	var RootView = require('views/RootView');

	var bookList = new Book.collection();
	bookList.fetch({reset: true});

	User.fetch();

	var rootView = new RootView({
		collection: bookList,
		el: $('#content')
	});
});