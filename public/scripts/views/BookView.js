define(function(require) {
	var Backbone     = require('lib/backbone');
	var BookEditView = require('./BookEditView');
	var User         = require('models/User');

	_.templateSettings = {
		interpolate : /{{([\s\S]+?)}}/g,
		evaluate: /{{(.+?)}}/g
	};

	var BookView = Backbone.View.extend({
		tagName: 'div',
		className: 'book',
		template: _.template($('#book-view-template').html()),
		events: {
			'click .star': 'toggleStarred',
			'click .edit': 'edit',
			'click .delete': 'delete',
			'click': 'toggleExpanded'
		},
		initialize: function(options) {
			this.model.on('change', this.render, this);
			this.expanded = false;
			this.render();
		},
		render: function() {
			this.$el.empty();

			this.$el.html(this.template(
				this.model.toJSON()
			));

			return this;
		},
		toggleExpanded: function() {
			if (this.editView) {
				return;
			}

			this.expanded = !this.expanded;

			if (this.expanded) {
				this.$('.expanded').html('<div></div>');
				this.detailView = new BookDetailView({model: this.model, el: this.$('.expanded div')});
			} else if (this.detailView) {
				this.detailView.remove();
			}
		},
		toggleStarred: function(e) {
			e.stopPropagation();

			this.model.set('isStarred', !this.model.get('isStarred'));
			this.model.save();
		},
		expand: function(shouldExpand) {
			this.expanded = shouldExpand;
			this.render();
		},
		edit: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.editView = new BookEditView({model: this.model, el: this.$('.editView')});
			this.$el.addClass('editing');
			this.listenTo(this.editView, 'cancelled', this.hideEdit);
			this.listenTo(this.editView, 'saved', this.hideEdit);
		},
		hideEdit: function() {
			this.$('.editView').empty();
			this.editView = null;
			this.$el.removeClass('editing');
		},
		delete: function(e) {
			e.stopPropagation();
			this.model.destroy();
			this.remove();
		}
	});

	var BookDetailView = Backbone.View.extend({
		template: _.template($('#book-detail-view-template').html()),
		initialize: function(options) {
			this.model.on('change', this.render, this);
			this.render();
		},
		render: function() {
			var libraryUrl = this.model.libraryUrl(User.get('librarySearchUrl'));

			this.$el.html(this.template({
				amazon: this.model.amazonUrl(),
				goodreads: this.model.goodreadsUrl(),
				library: libraryUrl
			}));

			if (!libraryUrl) {
				this.$('.library').hide();
			}

			return this;
		}
	});

	return BookView;
});