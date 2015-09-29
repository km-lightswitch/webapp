var app = require("../app.js");

var organizationService = app.service('organizationService', ['$http', '$q',
	function ($http, $q) {
		return {
			getOrganizations: function () {
				return $q(function (resolve, reject) {
					$http({
						method: 'GET',
						url: '/api/organizations'
					}).then(function successCallback(response) {
						resolve(response.data);
					}, function errorCallback(response) {
						console.log('Could not get organizations - ' + response.data);
						reject(response.data);
					});
				});
			}
		}
	}
]);


module.exports = organizationService;