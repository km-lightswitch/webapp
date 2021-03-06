'user strict'
var _ = require('lodash');

class instanceService {

	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
	}

	getInstances(teamName) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'GET',
				url: '/api/instances/' + teamName
			}).then((response) => {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not get instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	discoverInstances(teamName) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'GET',
				url: '/api/instances/' + teamName + '/discover'
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

	manageInstance(teamName, instance) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/instances/' + teamName + '/manage',
				data: { region: instance.AvailabilityZone, instances: [instance.InstanceId] }
			}).then((response) => {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not add instances to managed instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	unmanageInstance(teamName, instance) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'PUT',
				url: '/api/instances/' + teamName + '/unmanage',
				data: { instances: [instance.instanceId] }
			}).then((response) => {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not remove instances from managed instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	startInstances(instances) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/instances/start',
				data: { instances: _.pluck(instances, 'InstanceId') }
			}).then((response) => {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not start instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	stopInstances(instances) {
		return this.$q((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: '/api/instances/stop',
				data: { instances: _.pluck(instances, 'InstanceId') }
			}).then((response) => {
				resolve(response.data);
			}, function errorCallback(response) {
				console.log('Could not stop instances - ' + response.data);
				reject(response.data);
			});
		});
	}

	extractNameFromTag(instance) {
		var nameTag = _.find(instance.Tags, (tag) => {
			return tag.Name !== undefined;
		})
		if (nameTag) {
			instance.Name = nameTag.Name;
		}
		return instance;
	}

	extractEnvironmentFromTag(instance) {
		var environmentTag = _.find(instance.Tags, (tag) => {
			return tag.env !== undefined;
		})
		if (environmentTag) {
			instance.Environment = environmentTag.env;
		}
		return instance;
	}
}

module.exports = instanceService;