'use strict'

var instancesService = require('./instances-service');
var StateChangeRequest = require('../models/state-change-request');

class InstanceStateChangeService {

	* saveStateChangeRequests(atTime, nextMinutes) {
		let instanceStateChangeEvents = yield instancesService.getInstanceStateChangeEvents(atTime, nextMinutes);

		var i = 0;
		var len = instanceStateChangeEvents.length;
		while (i < len) {
		    var doc = StateChangeRequest(instanceStateChangeEvents[i++]);
			yield doc.save();	
		}		
	}

}

module.exports = new InstanceStateChangeService();