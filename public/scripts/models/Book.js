define(function(require) {
	var Backbone = require('backbone');
	var LibraryInfo = require('./LibraryInfo');

	var Book = Backbone.Model.extend({
		// title, author, isStarred, libraryInfo
		idAttribute: '_id',
		urlRoot: '/api/books',
		defaults: function() {
			return {
				'title': null,
				'author': null,
				'isStarred': false,
				'libraryInfo': new LibraryInfo({name: 'Library'})
			};
		},
		sortString: function() {
			var title = this.get('title');
			var author = this.get('author');
			if (author) {
				return author.toLowerCase().split(' ').pop();
			} else if (title) {
				return title.toLowerCase();
			} else {
				return '';
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
		libraryUrl: function(librarySearchUrl) {
			return librarySearchUrl ? librarySearchUrl.replace('<searchString>', this.searchString()) : null;
		},
		parse: function(response){
            var libraryInfoData = response['libraryInfo'];
            response['libraryInfo'] = new LibraryInfo(libraryInfoData);
	        return response;
	    }
	});

	var BookList = Backbone.Collection.extend({
		model: Book,
		url: '/api/books',
		comparator: function(book) {
			return book.sortString();
		},
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