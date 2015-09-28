var app = require("../app.js");

var organizationService = app.service('organizations', function () {
	return [
		{ "organizationId": "org-y", "name": "Yankee" },
		{ "organizationId": "org-x", "name": "Xanadu" }
	];
});

module.exports = organizationService;