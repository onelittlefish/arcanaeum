define(function(require) {
	var Backbone = require('lib/backbone');
	var jquery = require('jquery');

	var Book = require('models/Book');

	var SearchFilterView = require('./SearchFilterView');
	var BookListView = require('./BookListView');
	var BookEditView = require('./BookEditView');

	var RootView = Backbone.View.extend({
		events: {
			'click #expand-all': 'expandAll',
			'click #collapse-all': 'collapseAll'
		},
		initialize: function() {
			this.searchFilterView = new SearchFilterView({
				collection: this.collection,
				el: $('#search-filter')
			});

			this.bookListView = new BookListView({
				collection: this.collection,
				el: $('.books')
			});

			this.render();

			this.listenTo(this.collection, 'filter', this.renderFiltered);
		},
		render: function() {
			return this;
		},
		renderFiltered: function(filtered) {
			if (filtered.isEmpty() && this.searchFilterView.searchValue()) {
				var query = this.searchFilterView.searchValue().split('-');
				var title = query[0].trim();
				var author = '';
				if (query.length > 1) {
					author = query[1].trim();
				}
				var newBook = new Book({title: title, author: author});

				this.showEditView(newBook);
			} else {
				this.hideEditView();
			}
		},
		showEditView: function(model) {
			this.$('#add').html('<td></td>')
			this.$('#add td').addClass('editing');
			
			this.editView = new BookEditView({model: model, el: this.$('#add td')});
			
			this.listenTo(this.editView, 'cancelled', this.editCancelled);
			this.listenTo(this.editView, 'saved', this.editSaved);
		},
		hideEditView: function() {
			this.editView.remove();
			this.editView = null;
		},
		editCancelled: function() {
			this.hideEditView();
		},
		editSaved: function() {
			this.collection.add(this.editView.model);
			
			this.hideEditView();

			this.searchFilterView.clearSearchValue();
		},
		expandAll: function() {
			this.bookListView.expandAll(true);
		},
		collapseAll: function() {
			this.bookListView.expandAll(false);
		}
	});

	return RootView;
});