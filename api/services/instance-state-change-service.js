'use strict'
var _ = require('lodash');
var instancesService = require('./instances-service');
var StateChangeRequest = require('../models/state-change-request');

class InstanceStateChangeService {
	
	* saveStateChangeRequests(atTime, nextMinutes) {
		let instanceStateChangeEvents = instancesService.getInstanceStateChangeEvents(atTime, nextMinutes);
		
		_.forEach(instanceStateChangeEvents, (event) => {
			(StateChangeRequest(event)).save();
		});
		
		return;
	}
				
}

module.exports = new InstanceStateChangeService();