var expect = require('chai').expect
	, moment = require('moment-timezone');

var weekly = require('../../api/models/weekly-schedule');

describe('Schedule', function () {
	describe('#up', function () {
		it('for UPTIME schedules, reports the status as up at time T within uptime hours', function () {
			var mondayMorning11AMIST = moment("2015-10-05T11:00+05:30").format();
			expect(weekly.WEEKDAYS_UPTIME.up(mondayMorning11AMIST)).to.be.true;
		});

		it('for UPTIME schedules, reports the status as down at time T before uptime hours', function () {
			var mondayMorningFiveToTenAMIST = moment("2015-10-05T09:55+05:30").format();
			expect(weekly.WEEKDAYS_UPTIME.down(mondayMorningFiveToTenAMIST)).to.be.true;
		});

		it('for UPTIME schedules, reports the status as down at time T after uptime hours', function () {
			var tuesdayEveningTenPMIST = moment("2015-10-06T22:00+05:30").format();
			expect(weekly.WEEKDAYS_UPTIME.down(tuesdayEveningTenPMIST)).to.be.true;
		});

		it('for DOWNTIME schedules, reports the status as down at time T within downtime hours', function () {
			var saturdayMorning10AMIST = moment("2015-10-03T10:00+05:30").format();
			expect(weekly.WEEKENDS_DOWNTIME.down(saturdayMorning10AMIST)).to.be.true;
		});

		it('for DOWNTIME schedules, reports the status as up at time T before downtime hours', function () {
			var sundayMorning10AMIST = moment("2015-10-04T10:00:00+05:30").format();
			expect(weekly.WEEKENDS_DOWNTIME.up(sundayMorning10AMIST)).to.be.true;
		});

		it('for DOWNTIME schedules, reports the status as up at time T after downtime hours', function () {
			var sundayEveningWhiskyTimeIST = moment("2015-10-04T20:05+05:30").format();
			expect(weekly.WEEKENDS_DOWNTIME.up(sundayEveningWhiskyTimeIST)).to.be.true;
		});
	})
});

describe('Schedule', function() {
	describe('#getEvent()', function(){
		it('emits an event when there is a state change to UP within next N minutes', function(){
			var mondayMorningFiveTo10AMIST = moment("2015-10-05T09:55:00+05:30");
			expect(weekly.WEEKDAYS_UPTIME.getEvent(mondayMorningFiveTo10AMIST, 8)).to.eql(
				{
					"state": "up",
					"at": "2015-10-05T04:33:00+00:00"
				}
			);			
		});
		
		it('emits an event when there is a state change to DOWN within next N minutes', function(){
			var mondayEveningFiveTo7PMIST = moment("2015-10-05T18:55:00+05:30");
			expect(weekly.WEEKDAYS_UPTIME.getEvent(mondayEveningFiveTo7PMIST, 7)).to.eql(
				{
					"state": "down",
					"at": "2015-10-05T13:32:00+00:00"
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