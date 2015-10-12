'use strict'
var _ = require('lodash');
var co = require('co');
var StateChangeRequest = require('../models/state-change-request');

class InstanceOperationsService {

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