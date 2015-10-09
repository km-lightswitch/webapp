'use strict'
class UserService {

	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
	}

	getUser() {
		return this.$q((resolve, reject) => {
			this.$http({
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

module.exports = UserService;