var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
	title: String,
	author: String,
	isStarred: Boolean,
	libraryInfo: {
		name: String,
		isAvailable: Boolean,
		section: String
	}
});

module.exports = mongoose.model('Book', BookSchema);