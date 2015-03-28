var _           = require('lodash');
var auth        = require('../auth/auth');
var Book        = require('../models/Book');
var bookService = require('../services/bookService');
var express     = require('express');

var router = module.exports = express.Router();

router.use(function(req, res, next) {
	console.log('Request');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Hello.' });
});

router.route('/books')
	.all(auth.apiAuth)
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
	.all(auth.apiAuth)
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

router.use('/books.csv', auth.apiAuth, function(req, res, next) {
	bookService.booksAsCSV(function(err, csv) {
		if (err) {
			console.log("error: " + err);
			res.send(err);
		}

		res.type('csv');
		res.send(csv);
	});
});