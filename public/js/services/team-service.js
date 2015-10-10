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

	createTeam(team) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/teams',
				data: team
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not create new team - ' + response.data);
				reject(response.data);
			});
		});
	}

	addMember(team, member) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/teams/' + team.name + '/members',
				data: { "member": member }
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not add new member - ' + response.data);
				reject(response.data);
			});
		});
	}

	removeMember(team, member) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'PUT',
				url: '/api/teams/' + team.name + '/members/delete',
				data: { "member": member }
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not remove member - ' + response.data);
				reject(response.data);
			});
		});
	}
}

module.exports = TeamService;