define(function(require) {
	var Backbone = require('backbone');
	var User = require('models/User');

	// TODO: Duplicated from BookView.js
	_.templateSettings = {
		interpolate : /{{([\s\S]+?)}}/g,
		evaluate: /{{(.+?)}}/g
	};

	var SettingsView = Backbone.View.extend({
		template: _.template($('#settings-view-template').html()),
		events: {
			'click .cancel': 'cancel',
			'submit': 'save'
		},
		initialize: function(options) {
			this.render();
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},
		cancel: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.trigger('cancelled');
		},
		save: function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.model.set('librarySearchUrl', this.valueForInput('librarySearchUrl'));

			this.model.save();

			this.trigger('saved');
		},
		valueForInput: function(name) {
			var value = this.$('input[name=' + name + ']').val();
			return value ? value.trim() : value;
		}
	});

	return SettingsView;
});