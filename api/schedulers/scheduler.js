var CronJob = require('cron').CronJob;
var moment = require('moment-timezone');

var stateChangeService = require('../services/instance-state-change-service');

var stateChangeServiceSchedule = '5 0-59 * * * *';
var recordStateChangeService = new CronJob(stateChangeServiceSchedule, function () {
	console.log('Running record state change service at', moment().format());
	stateChangeService.saveStateChangeRequests(moment().format(), 5);
}, function () {
	console.log('Stopping record state change service at', moment().format());
},
	false
	);

module.exports = {
	recordStateChangeService: recordStateChangeService
};