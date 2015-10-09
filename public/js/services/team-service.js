'use strict'

class TeamService {
	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
	}

	getTeams() {
		return this.$q((resolve, reject) => {
			this.$http({
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

module.exports = TeamService;