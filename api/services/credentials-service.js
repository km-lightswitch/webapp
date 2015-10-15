'use strict'

var Credentials = require('../models/credentials');

class CredentialsService {

	* getCredentials(teamId) {
		return yield Credentials.findOne({ 'teamId': teamId });
	}

	* create(credentials, teamId, user) {

		var existingCredentials = yield this.getCredentials(teamId);
		if (existingCredentials) {
			existingCredentials.accessKeyId = credentials.accessKeyId;
			existingCredentials.secretAccessKey = credentials.secretAccessKey
			yield existingCredentials.save();
			return;
		} else {
			var doc = Credentials({
				accessKeyId: credentials.accessKeyId,
				secretAccessKey: credentials.secretAccessKey,
				teamId: teamId,
				savedByUser: user
			})
			yield doc.save();
			return;
		}
	}

	* getAccessKeyId(teamId) {
		var credentials = yield this.getCredentials(teamId);
		if (credentials) {
			return credentials.accessKeyId;
		} else {
			return null;
		}
	}

}

module.exports = new CredentialsService();