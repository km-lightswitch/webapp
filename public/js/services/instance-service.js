'user strict'
var _ = require('lodash');

class instanceService {

	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
	}

	getInstances() {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'GET',
				url: '/api/instances'
			}).then((response) => {
				var data = _.map(response.data, this.extractNameFromTag);
				data = _.map(data, this.extractEnvironmentFromTag);
				resolve(data);
			}, function errorCallback(response) {
				console.log('Could not get instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	extractNameFromTag(instance) {
		var nameTag = _.find(instance.Tags, (tag) => {
			return tag.Name !== undefined;
		})
		instance.Name = nameTag.Name;
		return instance;
	}

	extractEnvironmentFromTag(instance) {
		var nameTag = _.find(instance.Tags, (tag) => {
			return tag.env !== undefined;
		})
		instance.Environment = nameTag.env;
		return instance;
	}
}

module.exports = instanceService;