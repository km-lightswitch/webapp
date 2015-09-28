var app = require("../app.js");

var instancesService = app.service('instances', function () {
	return [
		{ "instanceId": "i-ab123456", "state": "running", "organisation": "org-x", "region": "eu-west-1" },
		{ "instanceId": "i-xz123456", "state": "stopped", "organisation": "org-y", "region": "us-east-1" }
	];
});

module.exports = instancesService;