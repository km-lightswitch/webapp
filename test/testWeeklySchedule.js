process.env.NODE_ENV = 'test';
var expect = require('chai').expect
	, moment = require('moment-timezone');

var weekly = require('../api/services/weeklySchedule');

describe('Schedule', function () {
	describe('#up', function () {
		it('for UPTIME schedules, reports the status as up at time T within uptime hours', function () {
			var mondayMorning11AMIST = moment("2015-10-05T11:00:00+05:30");
			expect(weekly.WEEKDAYS_UPTIME.up(mondayMorning11AMIST)).to.be.true;
		});

		it('for UPTIME schedules, reports the status as down at time T outside of uptime hours', function () {
			var mondayMorning4AMIST = moment("2015-10-05T04:00:00+05:30");
			expect(weekly.WEEKDAYS_UPTIME.up(mondayMorning4AMIST)).to.be.false;
		});

		it('for DOWNTIME schedules, reports the status as down at time T within downtime hours', function () {
			var saturdayMorning10AMIST = moment("2015-10-03T10:00:00+05:30");
			expect(weekly.WEEKENDS_DOWNTIME.up(saturdayMorning10AMIST)).to.be.false;
		});

		it('for DOWNTIME schedules, reports the status as up at time T outside downtime hours', function () {
			var sundayMorning10AMIST = moment("2015-10-04T10:00:00+05:30");
			expect(weekly.WEEKENDS_DOWNTIME.up(sundayMorning10AMIST)).to.be.true;
		});
	})
});

describe('Schedule', function() {
	describe('#getEvent()', function(){
		it('emits an event when there is a state change within next N minutes', function(){
			var mondayMorningFiveTo10AMIST = moment("2015-10-05T09:55:00+05:30");
			expect(weekly.WEEKDAYS_UPTIME.getEvent(mondayMorningFiveTo10AMIST, 8)).to.eql(
				{
					"state": "up",
					"at": "2015-10-05T04:33:00+00:00"
				}
			);			
		});
	})
});

describe('Schedule', function() {
	describe('#strToTimes', function(){
		it('converts an array of time strings to an array of times since midnight', function(){
			expect(weekly.WEEKDAYS_UPTIME.strToTimes(['00:01'], "+00:00")).to.eql([1]);
			expect(weekly.WEEKDAYS_UPTIME.strToTimes(['00:01', '22:23'], "+00:00")).to.eql([1, ((22 * 60) + 23)]);
		});
	})
});

describe('Schedule', function() {
	describe('#isBetween', function(){
		it('compares the time to an array of times', function(){
			expect(weekly.WEEKDAYS_UPTIME.isBetween(14, [12, 36])).to.be.true;
		});
	})
});