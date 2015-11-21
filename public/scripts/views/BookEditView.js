define(function(require) {
	var Backbone = require('backbone');
	var Book = require('models/Book');

	// TODO: Duplicated from BookView.js
	_.templateSettings = {
		interpolate : /{{([\s\S]+?)}}/g,
		evaluate: /{{(.+?)}}/g
	};

	var BookEditView = Backbone.View.extend({
		template: _.template($('#book-edit-view-template').html()),
		events: {
			'click .star': 'toggleStarred',
			'click .cancel': 'cancel',
			'submit': 'submit'
		},
		initialize: function(options) {
			if (!this.model) {
				this.model = new Book();
			}
			this.starred = this.model.get('isStarred');
			this.render();
		},
		render: function() {
			this.$el.html(this.template(
				_.assign(this.model.toJSON(), {'starred': this.starred})
			));

			return this;
		},
		toggleStarred: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.starred = !this.starred;

			this.$('.star').toggleClass('starred', this.starred);
			this.$('.star').toggleClass('unstarred', !this.starred);
		},
		cancel: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.trigger('cancelled');
		},
		submit: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.save();
		},
		save: function() {
			var libraryInfo = this.model.get('libraryInfo').clone();
			libraryInfo.set('isAvailable', this.$('input[name="isAvailable"]').is(':checked'));
			libraryInfo.set('section', this.valueForInput('section'));

			this.model.save({
				'isStarred': this.starred,
				'title': this.valueForInput('title'),
				'author': this.valueForInput('author'),
				'libraryInfo': libraryInfo
			});

			this.trigger('saved');
		},
		valueForInput: function(name) {
			var value = this.$('input[name=' + name + ']').val();
			return value ? value.trim() : value;
		}
	});

	return BookEditView;
});