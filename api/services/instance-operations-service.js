'use strict'
var _ = require('lodash');
var co = require('co');

var StateChangeRequest = require('../models/state-change-request');
var instancesService = require('./instances-service');
var ec2 = require('./ec2');


class InstanceOperationsService {

	* manageInstances(instanceIds, teamId, registeredBy) {
		var i = 0;
		var len = instanceIds.length;
		while (i < len) {
			var instanceId = instanceIds[i++];
			instancesService.manageInstance(instanceId, teamId, registeredBy);
			yield ec2.tagInstance(instanceId, teamId);
		}
	}

	* startInstances(instances, user) {
		yield _.map(instances, (instanceId) => {
			co(this.changeInstanceState(instanceId, user, 'start'));
		});
	}

	* stopInstances(instances, user) {
		yield _.map(instances, (instanceId) => {
			co(this.changeInstanceState(instanceId, user, 'stop'));
		});
	}

	* changeInstanceState(instanceId, user, newState) {
		var request = new StateChangeRequest({
			instanceId: instanceId,
			requestedState: newState,
			requestedAt: new Date(),
			requestedBy: user
		})

		return yield request.save();
	}
}

module.exports = new InstanceOperationsService();