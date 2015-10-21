var ec2 = require('../modules/ec2.js');

var credentials = {
	accessKeyId: "AKIAI5HIPILW4HP3ZHJQ",
	secretAccessKey: "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",
	region: "eu-west-1"
};

ec2.listInstances(credentials)
	.then(function (data) {
		console.log(data[0]);
	})
	.catch(function (error) {
		console.error(error);
	});