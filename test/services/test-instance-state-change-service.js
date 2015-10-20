'use strict'
var expect = require('chai').expect;
var _ = require('lodash');

var db = require('../../api/db');
var weeklySchedule = require('../../api/models/weekly-schedule').WEEKDAYS_UPTIME;
var Instance = require('../../api/models/instance')
var StateChangeRequest = require('../../api/models/state-change-request');

var moment = require('moment-timezone');

var instanceStateChangeService = require('../../api/services/instance-state-change-service');

describe('InstanceStateChangeService', function () {
	let mongoose;
	beforeEach(function () {
		mongoose = db.connect();
		_.forEach(['instances', 'statechangerequests'], (collection) => {
			mongoose.connection.collections[collection].drop();
		});
	});

	it('Creates instance state change events', function* () {
		var schedule = {
			name: weeklySchedule.getName(),
			nature: weeklySchedule.nature(),
			timespan: weeklySchedule.timespan(),
			timezone: weeklySchedule.timezone(),
			schedules: weeklySchedule.schedules()
		}

		yield Instance({
			instanceId: 'foo',
			teamId: 'fooTeam',
			region: 'eu-east-1',
			schedule: schedule
		}).save();

		let mondayFourToTenAMIST = moment('2015-10-19T09:56:00+05:30');
		let nextFiveMinutes = 5;

		yield instanceStateChangeService.saveStateChangeRequests(mondayFourToTenAMIST, nextFiveMinutes);
		
		let stateChangeRequest = yield StateChangeRequest.findOne({'instanceId':'foo'}, 'instanceId').exec();
		expect(stateChangeRequest.instanceId).to.equal('foo');
	});


	afterEach(function () {
		_.forEach(['instances', 'statechangerequests'], (collection) => {
			mongoose.connection.collections[collection].drop();
		});
		mongoose.connection.close();
	});
});