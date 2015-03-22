define(function(require) {
	var Backbone = require('lib/backbone');
	var BookEditView = require('./BookEditView');

	var BookView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click .starred' : 'toggleStarred',
			'click .edit': 'edit',
			'click .delete': 'delete',
			'click': 'toggleExpanded'
		},
		// events: {
		// 	'click .toggle': 'toggleCompleted',
		// 	'click .delete': 'delete',
		// 	'dblclick label': 'toggleEdit',
		// 	'keypress .edit': 'updateOnEnter',
		// 	'blur .edit': 'closeEditing'
		// },
		initialize: function(options) {
			this.model.on('change', this.render, this);
			this.expanded = false;
			this.render();
		},
		render: function() {
			this.$el.addClass('book');
			this.$el.html('<span class="modify"><a href="#" class="starred">' + (this.model.get('isStarred') ? 'starred' : 'unstarred') + '</a> | <a href="#" class="edit">edit</a> | <a href="#" class="delete">delete</a></span><span>' + this.model.summary() + '</span><span class="expanded"></span>');
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
			e.stopPropagation();
			this.editView = new BookEditView({model: this.model, el: this.$('.expanded')});
			this.editView.$el.toggle(true);
			this.listenTo(this.editView, 'cancelled', this.hideEdit);
			this.listenTo(this.editView, 'saved', this.hideEdit);
		},
		hideEdit: function() {
			this.editView.remove();
			this.editView = null;
			this.toggleExpanded();
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
			var libraryInfo = this.model.get('libraryInfo');
			if (libraryInfo && libraryInfo.get('isAvailable')) {
				this.$el.html('Available at library' + '<br>Section: ' + libraryInfo.get('section'));
			} else {
				this.$el.html('Unavailable');				
			}
		}
	});

	return BookView;
});