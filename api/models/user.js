var mongoose = require('mongoose');

var userSchema = {
	displayName: String,
	email: { type: String, index: true }
}

module.exports = mongoose.model('User', userSchema);