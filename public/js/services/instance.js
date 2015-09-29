var app = require('../app.js');

var instanceService = app.service('instanceService', ['$http', '$q',
	function ($http, $q) {
		return {
			getInstances: function () {
				return $q(function (resolve,reject) {
					$http({
						method: 'GET',
						url: '/api/instances'
					}).then(function successCallback(response) {
						resolve(response.data);
					}, function errorCallback(response) {
						console.log('Could not get instances - ' + response.data);
						reject(response.data);
					});
				});
			}
		}
	}
]);

module.exports = instanceService;