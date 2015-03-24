define(function(require) {
	var Backbone = require('lib/backbone');
	var BookEditView = require('./BookEditView');

	var BookView = Backbone.View.extend({
		tagName: 'div',
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
			this.$el.addClass('book');

			this.$el.append('<div class="star"><a href="#" class="' + (this.model.get('isStarred') ? 'starred' : 'unstarred') + '"></a></div>');
			this.$el.append('<div class="title">' + this.model.get('title') + '</div>');
			this.$el.append('<div class="author">' + this.model.get('author') + '</div>');
			this.$el.append('<div class="inLibrary"><span class="' + (this.model.get('libraryInfo').get('isAvailable') ? 'checkmark' : '') + '"></span></div>');
			this.$el.append('<div class="librarySection">' + this.model.get('libraryInfo').get('section') + '</div>');
			this.$el.append('<div class="modify"><a href="#" class="edit">edit</a> | <a href="#" class="delete">delete</a></div>');
			this.$el.append('<div class="editView"></div>');
			this.$el.append('<div class="expanded"></div>');

			this.detailView = new BookDetailView({model: this.model, el: this.$('.expanded')});
			this.detailView.$el.toggle(this.expanded);

			return this;
		},
		toggleExpanded: function() {
			if (this.editView) {
				return;
			}
			this.expanded = !this.expanded;
			this.render();
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
		initialize: function(options) {
			this.model.on('change', this.render, this);
			this.render();
		},
		render: function() {
			this.$el.append('<a href="' + this.model.amazonUrl() + '">Amazon</a> | ');
			this.$el.append('<a href="' + this.model.goodreadsUrl() + '">Goodreads</a> | ');
			this.$el.append('<a href="' + this.model.libraryUrl() + '">Library</a>');
		}
	});

	return BookView;
});