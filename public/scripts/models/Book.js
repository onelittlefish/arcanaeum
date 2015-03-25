define(function(require) {
	var Backbone = require('lib/backbone');
	var LibraryInfo = require('./libraryInfo');

	var Book = Backbone.Model.extend({
		// title, author, isStarred, libraryInfo
		idAttribute: '_id',
		urlRoot: 'http://localhost:8080/api/books',
		defaults: function() {
			return {
				'isStarred': false,
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
		sortString: function() {
			var author = this.get('author');
			if (author) {
				return author.toLowerCase().split(' ').pop();
			} else {
				return this.get('title').toLowerCase();
			}
		},
		searchString: function() {
			var searchString = this.get('title') + ' ' + this.get('author');
			return encodeURIComponent(searchString);
		},
		amazonUrl: function() {
			return 'http://www.amazon.com/s?field-keywords=' + this.searchString();
		},
		goodreadsUrl: function() {
			return 'http://www.goodreads.com/search?query=' + this.searchString();
		},
		libraryUrl: function() {
			return '' + this.searchString();
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