define(function(require) {
	var Backbone = require('lib/backbone');

	var User = Backbone.Model.extend({
		// email, librarySearchUrl
		idAttribute: '_id',
		urlRoot: '/api/user',
		defaults: {
			'librarySearchUrl': null
		}
	});

	return new User();
});