var app = require("../app.js");

var teamService = app.service('teamService', ['$http', '$q',
	function ($http, $q) {
		return {
			getTeams: function () {
				return $q(function (resolve, reject) {
					$http({
						method: 'GET',
						url: '/api/teams'
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


module.exports = teamService;