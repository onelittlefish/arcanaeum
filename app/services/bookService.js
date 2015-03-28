var _       = require('lodash');
var Book    = require('../models/Book');

var booksAsCSV = function(onLoaded) {
	Book.find(function(err, books) {
		if (err) {
			console.log("error: " + err);
			onLoaded(err, null);
		}

		var csv = csvForBooks(books);
		onLoaded(null, csv);
	});
}

var csvForBooks = function(books) {
	return "title,author,library,section,starred\r\n"
			+ books.map(function(book){
				return [
					_escapeCsvString(book.title),
					_escapeCsvString(book.author),
					_escapeCsvString(book.libraryInfo.isAvailable ? "yes" : "no"),
					_escapeCsvString(book.libraryInfo.section),
					_escapeCsvString(book.isStarred ? "yes" : "no")
				].join(",");
			}).join('\r\n');
}

var _escapeCsvString = function(str){
	return (_.isString(str)) ? '"'+str.replace(/"/g, '""')+'"' : "";
}

module.exports.booksAsCSV = booksAsCSV;