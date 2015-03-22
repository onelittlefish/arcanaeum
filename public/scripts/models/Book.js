define(function(require) {
	var Backbone = require('lib/backbone');
	var LibraryInfo = require('./libraryInfo');

	var Book = Backbone.Model.extend({
		// title, author, isStarred, libraryInfo
		idAttribute: '_id',
		urlRoot: 'http://localhost:8080/api/books',
		defaults: function() {
			return {
				'libraryInfo': new LibraryInfo({name: 'Library'})
			};
		},
		summary: function() {
			var title = this.get('title');
			var author = this.get('author');
			var bookString = "";
			if (title && author) {
				bookString = title + " - " + author;
			} else if (title) {
				bookString = title;
			} else if (author) {
				bookString = author;
			}
			return bookString;
		},
		parse: function(response){
            var libraryInfoData = response['libraryInfo'];
            response['libraryInfo'] = new LibraryInfo(libraryInfoData);
	        return response;
	    }
	});

	var BookList = Backbone.Collection.extend({
		model: Book,
		url: 'http://localhost:8080/api/books',
		search: function(query) {
		    this.searchFunction = function(book) {
				var title = book.get('title');
				var author = book.get('author');
				var substrRegex = new RegExp(query, 'i');
				return (title && substrRegex.test(book.get('title'))) || (author && substrRegex.test(book.get('author')));
			};

			this.applySearchAndFilter();
		},
		clearSearch: function() {
			this.searchFunction = null;
			this.applySearchAndFilter();
		},
		filterAll: function() {
			this.filterFunction = null;
			this.applySearchAndFilter();
		},
		filterStarred: function() {
			this.filterFunction = function(book) {
				return book.get('isStarred');
			};

			this.applySearchAndFilter();
		},
		filterLibrary: function() {
			this.filterFunction = function(book) {
				var libraryInfo = book.get('libraryInfo');
				return libraryInfo && libraryInfo.get('isAvailable');
			};

			this.applySearchAndFilter();
		},
		filterNotLibrary: function() {
			this.filterFunction = function(book) {
				var libraryInfo = book.get('libraryInfo');
				return !libraryInfo || !libraryInfo.get('isAvailable');
			};

			this.applySearchAndFilter();
		},
		applySearchAndFilter: function() {
			var filtered = _(this.filter(_.bind(function(book) {
				if (this.filterFunction && this.searchFunction) {
					return this.filterFunction(book) && this.searchFunction(book);
				} else if (this.filterFunction) {
					return this.filterFunction(book);
				} else if (this.searchFunction) {
					return this.searchFunction(book);
				} else {
					return true;
				}
			}, this)));

			this.trigger('filter', filtered);
		}
	});

	Book.collection = BookList;

	return Book;
});