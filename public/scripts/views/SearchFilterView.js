define(function(require) {
	var Backbone = require('lib/backbone');

	var SearchFilterView = Backbone.View.extend({
		events: {
			'keyup .search': 'search',
			'click #filters #all': 'filterAll',
			'click #filters #starred': 'filterStarred',
			'click #filters #library': 'filterLibrary',
			'click #filters #not-library': 'filterNotLibrary'
		},
		initialize: function() {
			this.render();
			this.filterAll();
		},
		render: function() {
			return this;
		},
		search: function() {
			var query = this.$('.search').val().trim();
			this.collection.search(query);
		},
		searchValue: function() {
			return this.$('.search').val().trim()
		},
		clearSearchValue: function(value) {
			this.$('.search').val('');
			this.collection.clearSearch();
		},
		filterAll: function() {
			this.updateSelected('#filters #all');
			this.collection.filterAll();
		},
		filterStarred: function() {
			this.updateSelected('#filters #starred');
			this.collection.filterStarred();
		},
		filterLibrary: function() {
			this.updateSelected('#filters #library');
			this.collection.filterLibrary();
		},
		filterNotLibrary: function() {
			this.updateSelected('#filters #not-library');
			this.collection.filterNotLibrary();
		},
		updateSelected: function(selectedSelector) {
			this.$('#filters .selected').removeClass('selected');
			this.$(selectedSelector).addClass('selected');
		}
	});

	return SearchFilterView;
});