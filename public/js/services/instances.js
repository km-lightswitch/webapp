app.service('instances', function () {
	return [
		{ "instanceId": "i-ab123456", "state": "running", "organisation": "myOrg", "region": "eu-west-1" },
		{ "instanceId": "i-xz123456", "state": "stopped", "organisation": "theirOrg", "region": "us-east-1" }
	];
})