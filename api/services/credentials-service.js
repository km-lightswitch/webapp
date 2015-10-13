'use strict'

var Credentials = require('../models/credentials');

class CredentialsService {

	* getCredentials(teamId) {
		return yield Credentials.findOne({ 'teamId': teamId });
	}
	
	* create(credentials, teamId, user) {
		var doc = Credentials({
			accessKeyId: credentials.accessKeyId,
			secretAccessKey: credentials.secretAccessKey,
			teamId: teamId,
			savedByUser: user
		})
		
		var savedCredentials = yield doc.save();
		return; 
	}
		
}

module.exports = new CredentialsService();