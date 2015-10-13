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

	createTeam(teamName) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/teams',
				data: { name: teamName }
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not create new team - ' + response.data);
				reject(response.data);
			});
		});
	}

	deleteTeam(team) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'DELETE',
				url: '/api/teams/' + team.name,
				data: team
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(response) {
				console.error('Could not delete team - ' + response.data);
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
				console.error('Could not add new member - ' + response.data);
				reject(response.data);
			});
		});
	}
	
	saveCredentials(team, accessKeyId, secretAccessKey) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: 'api/teams/' + team.name + '/credentials',
				data: {  "accessKeyId": accessKeyId, "secretAccessKey": secretAccessKey }
			}).then(function successCallback(response) {
				resolve();
			}, function errorCallback(response) {
				console.error('Could not save credentials - ' + response.data);
				reject(response.data);
			})
			
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
				console.error('Could not remove member - ' + response.data);
				reject(response.data);
			});
		});
	}
}

module.exports = TeamService;