'use strict'
var moment = require('moment-timezone');
var _ = require('lodash');

var Instance = require('../models/instance');
var Schedule = require('../models/schedule');

class InstancesService {

	* manageInstance(instanceId, region, teamId, registeredBy) {
		let instance = Instance({
			instanceId: instanceId,
			region: region,
			teamId: teamId,
			registeredBy: registeredBy
		})

		return yield instance.save();
	}

	* getManagedInstances(teamId) {
		return yield Instance.find({ teamId: teamId }).exec();
	}

	* getInstanceSchedules() {
		let instanceData = yield Instance.find({}, 'instanceId teamId schedule').exec();
		return _.map(instanceData, (instance) => {
			return {
				instanceId: instance.instanceId,
				teamId: instance.teamId,
				schedule: new Schedule(instance.instanceId, instance.schedule)
			};
		});
	}

	* getInstanceStateChangeEvents(atTime, nextMinutes) {
		let instanceSchedules = yield this.getInstanceSchedules();
		let stateChangeEvents = _.map(instanceSchedules, (instanceSchedule) => {
			var stateChangeEventForSchedule = instanceSchedule.schedule.getEvent(atTime, nextMinutes);
			if (stateChangeEventForSchedule != undefined) {
				return {
					instanceId: instanceSchedule.instanceId,
					teamId: instanceSchedule.teamId,
					requestedState: stateChangeEventForSchedule.state == 'up' ? 'start' : 'stop',
					requestedAt: stateChangeEventForSchedule.at
				};
			} else {
				return undefined;
			}
		});

		return _.compact(stateChangeEvents);
	}

}

module.exports = new InstancesService();