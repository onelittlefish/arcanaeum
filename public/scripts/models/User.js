define(function(require) {
	var Backbone = require('lib/backbone');

	var User = Backbone.Model.extend({
		// email, librarySearchUrl
		idAttribute: '_id',
		urlRoot: 'http://localhost:8080/api/user',
		defaults: {
			'librarySearchUrl': null
		}
	});

	return new User();
});