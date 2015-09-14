define(function(require) {
	var Backbone = require('backbone');

	var LibraryInfo = Backbone.Model.extend({
		// name, isAvailable, section
		defaults: {
			'isAvailable': false
		}
	});

	return LibraryInfo;
});