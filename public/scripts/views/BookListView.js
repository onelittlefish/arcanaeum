define(function(require) {
	var Backbone = require('backbone');
	var BookView = require('./BookView');

	var BookListView = Backbone.View.extend({
		initialize: function() {
			this.listEl = this.$('#book-list');
			this.childViews = [];
			
			this.collection.on('reset', this.reset, this);
			this.collection.on('add', this.add, this);
			this.collection.on('remove', this.remove, this);
			this.listenTo(this.collection, 'filter', this.filter);

			this.render();
		},
		render: function() {
			return this._renderCollection(this.collection);
		},
		_renderCollection: function(collection) {
			this.$('.book').remove();
			this.childViews = [];
			collection.each(_.bind(function(book) {
				var bookView = new BookView({model: book});
				this.listEl.append(bookView.el);
				this.childViews.push(bookView);
			}, this));

			this._restripeRows();

			return this;
		},
		_restripeRows: function() {
			this.$('.book').removeClass('striped');
			this.$('.book').not('.hidden').filter(':odd').addClass('striped');
		},
		reset: function(collection, options) {
			this._renderCollection(collection);
		},
		add: function(model, collection, options) {
			var index = collection.indexOf(model);
			var bookView = new BookView({model: model});
			if (index == 0) {
				this.listEl.prepend(bookView.el);
			} else {
				var before = this.childViews[index - 1].$el;
				before.after(bookView.el);
			}
			this.childViews.splice(index, 0, bookView);
		},
		remove: function(model, collection, options) {
			this.childViews.splice(options.index, 1);
		},
		filter: function(filtered) {
			this.collection.each(_.bind(function(book) {
				var index = this.collection.indexOf(book);
				if (filtered.contains(book)) {
					this.childViews[index].$el.removeClass('hidden');
				} else {
					this.childViews[index].$el.addClass('hidden');
				}
			}, this));

			this._restripeRows();
		},
		expandAll: function(shouldExpand) {
			_.each(this.childViews, function(view) {
				view.expand(shouldExpand);
			});
		}
	});

	return BookListView;
});