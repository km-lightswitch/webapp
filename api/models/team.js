var mongoose = require('mongoose');

var teamSchema = {
	name: String,
	owner: { type: String, index: true },
	members: Array
}

module.exports = mongoose.model('Team', teamSchema);