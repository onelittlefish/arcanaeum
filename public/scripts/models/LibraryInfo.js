define(function(require) {
	var Backbone = require('lib/backbone');

	var LibraryInfo = Backbone.Model.extend({
		// name, isAvailable, section
		defaults: {
			'isAvailable': false
		}
	});

	return LibraryInfo;
});