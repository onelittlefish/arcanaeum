define(function(require) {
	var Backbone = require('lib/backbone');
	var Book = require('models/Book');

	var BookEditView = Backbone.View.extend({
		events: {
			'click #cancel': 'cancel',
			'submit': 'save'
		},
		initialize: function(options) {
			if (!this.model) {
				this.model = new Book();
			}
			this.render();
		},
		render: function() {
			this.$el.html(
				'<form> \
				    <fieldset> \
				      <label for="title">Title</label> \
				      <input type="text" name="title" value="' + (this.model.get('title') || '') + '"> \
				      <label for="author">Author</label> \
				      <input type="text" name="author" value="' + (this.model.get('author') || '') + '"> \
				      <label for="isAvailable">Available at library?</label> \
				      <input type="checkbox" name="isAvailable" value="isAvailable"' + (this.model.get('libraryInfo').get('isAvailable') ? 'checked' : '') + '> \
				      <label for="section">Section</label> \
				      <input type="text" name="section" value="' + (this.model.get('libraryInfo').get('section') || '') + '"> \
				      <!-- Allow form submission with keyboard without duplicating the dialog button --> \
				      <!-- <input type="submit" tabindex="-1" style="position:absolute; top:-1000px"> --> \
				      <button id="submit">Save</button> \
				      <button id="cancel">Cancel</button> \
				    </fieldset> \
				  </form>'
			);
		},
		cancel: function(e) {
			e.preventDefault();
			
			this.trigger('cancelled');
		},
		save: function(e) {
			e.preventDefault();

			this.model.set('title', this.valueForInput('title'));
			this.model.set('author', this.valueForInput('author'));

			var libraryInfo = this.model.get('libraryInfo');
			libraryInfo.set('isAvailable', this.$('input[name="isAvailable"]').is(':checked'));
			libraryInfo.set('section', this.valueForInput('section'));

			this.model.save();

			this.trigger('saved');
		},
		valueForInput: function(name) {
			var value = this.$('input[name=' + name + ']').val();
			return value ? value.trim() : value;
		}
	});

	return BookEditView;
});