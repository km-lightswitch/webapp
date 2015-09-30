var AWS = require('aws-sdk');


module.exports = {
	validateCredentials: function validateCredentials(credentials) {
		if (!credentials.accessKeyId) { throw new Error("Missing access key id"); }
		if (!credentials.secretAccessKey) { throw new Error("Missing secret access key"); }
		if (!credentials.region) { throw new Error("Missing region"); }
		return true;
	},
	
	listInstances: function listInstances(credentials) {
		validateCredentials(credentials);

		var ec2 = new AWS.EC2(credentials);
		return ec2.describeInstances(function (error, data) {
			if (error) {
				console.log(error);
				throw error;
			} else {
				return data;
			}
		});
	},
};
