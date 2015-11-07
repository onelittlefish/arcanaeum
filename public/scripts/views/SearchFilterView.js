define(function(require) {
	var Backbone = require('backbone');

	var SearchFilterView = Backbone.View.extend({
		events: {
			'keyup #search input': 'search',
			'click #search button': 'clearSearchValue',
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
			this.searchInput = this.$('#search input');
			this.searchClearButton = this.$('#search button');
			this.updateSearchClearButtonVisibility();

			return this;
		},
		search: function(event) {
			if (event.keyCode == 13) { // enter key
				this.trigger("searchSubmitted");
				return;
			}
			var query = this.searchValue();
			this.collection.search(query);

			this.updateSearchClearButtonVisibility();
		},
		searchValue: function() {
			return this.searchInput.val().trim()
		},
		clearSearchValue: function(value) {
			this.searchInput.val('');
			this.collection.clearSearch();

			this.updateSearchClearButtonVisibility();
		},
		updateSearchClearButtonVisibility: function() {
			if (this.searchValue().length > 0) {
				this.searchClearButton.show();
			} else {
				this.searchClearButton.hide();
			}
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