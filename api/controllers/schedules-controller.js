'use strict'
var ec2 = require('../services/ec2');
var schedulingService = require('../services/scheduling-service')

class SchedulesController {

	* getSchedules(next) {
		this.body = yield schedulingService.getInstances();
	}

	* createSchedule(next) {
		var instances = this.request.body.instances;
		yield schedulingService.startInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}

	* updateSchedule(next) {
		var instances = this.request.body.instances;
		yield schedulingService.stopInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}
	
	* deleteSchedule(next) {
		var instances = this.request.body.instances;
		yield schedulingService.stopInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}
}

module.exports = new SchedulesController();