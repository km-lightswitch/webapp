var expect = require('chai').expect;
var moment = require('moment-timezone');

var db = require('../../api/db');
var weeklySchedule = require('../../api/models/weekly-schedule').WEEKDAYS_UPTIME;
var Instance = require('../../api/models/instance');
var instancesService = require('../../api/services/instances-service');

describe('InstancesService', function () {
	let mongoose;
	beforeEach(function () {
		mongoose = db.connect();
		mongoose.connection.collections['instances'].drop();
	})

	describe('#saveInstanceAsManaged', function () {
		it('Sets instance to managed', function* () {
			let instance = yield (Instance({
				instanceId: 'manageThis',
				teamId: 'managedTeam',
				region: 'eu-west-1'
			})).save();

			yield instancesService.manageInstance('manageThis', 'managedTeam', 'x@orgs.bash');

			let managedInstance = yield Instance.findOne({ 'instanceId': 'manageThis', 'teamId': 'managedTeam' }, 'instanceId isManaged registeredBy registeredAt').exec();
			expect(managedInstance.registeredBy).to.equal('x@orgs.bash');
		});
	});

	describe('#getInstanceStateChangeEvents', function () {
		it('Fetches instance state change events', function* () {
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
				region: 'ap-southeast-1',
				schedule: schedule
			}).save();

			var mondayFourToTenAMIST = moment('2015-10-19T09:56:00+05:30');
			var fiveMinutes = 5;
			let instanceStateChangeEvents = yield instancesService.getInstanceStateChangeEvents(mondayFourToTenAMIST, fiveMinutes);
			expect(instanceStateChangeEvents[0].instanceId).to.equal('foo');
		});
	})

	describe('#getInstanceSchedules()', function () {

		it('Fetches instance schedules', function* () {
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
				region: 'us-east-1',
				schedule: schedule
			}).save();

			let schedules = yield instancesService.getInstanceSchedules();
			expect(schedules).not.to.be.empty;

			let firstSchedule = schedules[0];
			expect(firstSchedule.instanceId).to.equal('foo');
			expect(firstSchedule.teamId).to.equal('fooTeam');
		});

	});

	afterEach(function () {
		mongoose.connection.collections['instances'].drop();
		mongoose.connection.close();
	})
});