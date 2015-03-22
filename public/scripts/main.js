requirejs.config({
	paths: {
		'backbone': 'lib/backbone',
		'underscore': 'lib/lodash',
		'jquery': 'lib/jquery-2.1.1.min'
	}
});

define(function(require) {
	var jquery = require('jquery');
	var Book = require('models/Book');
	var LibraryInfo = require('models/LibraryInfo');
	var RootView = require('views/RootView');

	// var bookList = new Book.collection([
	// 	new Book({title: 'A', author: 'B', libraryInfo: new LibraryInfo({name: "SCLib", isAvailable: true, section: "new"})}),
	// 	new Book({title: 'C', author: 'D'}),
	// 	new Book({title: 'D'})
	// ]);

	var bookList = new Book.collection();

	var rootView = new RootView({
		collection: bookList,
		el: $('#content')
	});

});