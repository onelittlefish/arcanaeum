define(function(require) {
	var Backbone = require('lib/backbone');
	var BookView = require('./BookView');

	var BookListView = Backbone.View.extend({
		initialize: function() {
			this.collection.on('add', this.render, this);
			this.listenTo(this.collection, 'filter', this.renderCollection);
			this.render();
		},
		render: function() {
			return this.renderCollection(this.collection);
		},
		renderCollection: function(collection) {
			this.$el.empty();
			this.childViews = [];
			var sorted = _(collection.sortBy(function(book) {
				var author = book.get('author');
				var title = book.get('title');
				return author ? author.toLowerCase() : title.toLowerCase();
			}));
			sorted.each(_.bind(function(book) {
				var bookView = new BookView({model: book});
				this.$el.append(bookView.el);
				this.childViews.push(bookView);
			}, this));
			return this;
		},
		expandAll: function(shouldExpand) {
			_.each(this.childViews, function(view) {
				view.expand(shouldExpand);
			});
		},
	});

	return BookListView;
});