'use strict'
var ec2 = require('../services/ec2');
var instanceOperationsService = require('../services/instance-operations-service')

class InstancesController {

	* getInstances(next) {
		this.body = yield ec2.getInstances();
	}

	* startInstances(next) {
		var instances = this.request.body.instances;
		yield instanceOperationsService.startInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}

	* stopInstances(next) {
		var instances = this.request.body.instances;
		yield instanceOperationsService.stopInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}
}

module.exports = new InstancesController();