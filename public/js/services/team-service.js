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
				console.log('Could not get teams - ' + response.data);
				reject(response.data);
			});
		});
	}

	addMember(team, member) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'PUT',
				url: '/api/teams',
				data: { name: team.name, members: [member] }
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not add new member - ' + response.data);
				reject(response.data);
			});
		});
	}
}

module.exports = TeamService;