var app = require("../app.js");

var userService = app.service('userService', ['$http', '$q',
	function ($http, $q) {
		return {
			getUser: function () {
				return $q(function (resolve, reject) {
					$http({
						method: 'GET',
						url: '/api/user'
					}).then(function successCallback(response) {
						resolve(response.data);
					}, function errorCallback(response) {
						console.log('Could not get user - ' + response.data);
						reject(response.data);
					});
				});
			}
		}
	}
]);

module.exports = userService;