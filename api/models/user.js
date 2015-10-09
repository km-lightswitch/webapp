var mongoose = require('mongoose');

var userSchema = {
	name: String,
	email: { type: String, index: true }
}

module.exports = mongoose.model('User', userSchema);