var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentialsSchema = {
	accessKeyId: {
		type: String,
		required: true
	},
	secretAccessKey: {
		type: String,
		required: true
	},
	teamId: {
		type: String,
		required: true
	},
	savedByUser: {
		type: String,
		required: true
	},
	savedAt: {
		type: Date,
		default: Date.now
	}
};

var Credentials = mongoose.model('Credentials', credentialsSchema);

module.exports = Credentials;