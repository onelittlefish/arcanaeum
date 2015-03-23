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
			// <label for="title">Title</label> \
			// <label for="author">Author</label> \
			// <label for="isAvailable">Available at library?</label> \
			// <label for="section">Section</label> \
			this.$el.html(
				'<form> \
				    <fieldset> \
						<input type="text" name="title" class="title" value="' + (this.model.get('title') || '') + '"> \
						<input type="text" name="author" class="author" value="' + (this.model.get('author') || '') + '"> \
						<input type="checkbox" name="isAvailable" class="inLibrary" value="isAvailable"' + (this.model.get('libraryInfo').get('isAvailable') ? 'checked' : '') + '> \
						<input type="text" name="section" class="librarySection" value="' + (this.model.get('libraryInfo').get('section') || '') + '"> \
						<!-- Allow form submission with keyboard without duplicating the dialog button --> \
						<!-- <input type="submit" tabindex="-1" style="position:absolute; top:-1000px"> --> \
						<button class="submit">save</button> \
						<button class="cancel">cancel</button> \
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