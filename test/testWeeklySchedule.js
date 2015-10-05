'use strict'
process.env.NODE_ENV = 'test';
var expect = require('chai').expect
	, moment = require('moment-timezone');

var weekly = require('../api/services/weeklySchedule');

describe('Schedule', function () {
	describe('#up', function () {
		it('reports the status as up at time T within uptime hours', function () {
			var mondayMorning11AMIST = moment("2015-10-05T11:00:00+05:30");
			expect(weekly.up(mondayMorning11AMIST)).to.be.true;
		});

		it('reports the status as down at time T outside of uptime hours', function () {
			var mondayMorning4AMIST = moment("2015-10-05T04:00:00+05:30");
			expect(weekly.up(mondayMorning4AMIST)).to.be.false;
		});

	})
});

describe('Schedule', function() {
	describe('#timeOfDay', function(){
		it('parses a time of day as number of minutes since midnight', function(){
			expect(weekly.timeOfDay('00:01')).to.equal(1);
			expect(weekly.timeOfDay('04:30')).to.equal(270);
			expect(weekly.timeOfDay('23:59')).to.equal((23 * 60) + 59);
		});
	})
});

describe('Schedule', function() {
	describe('#strToTimes', function(){
		it('converts an array of time strings to an array of times since midnight', function(){
			expect(weekly.strToTimes(['00:01'])).to.eql([1]);
			expect(weekly.strToTimes(['00:01', '22:23'])).to.eql([1, ((22 * 60) + 23)]);
		});
	})
});

describe('Schedule', function() {
	describe('#isBetween', function(){
		it('compares the time to an array of times', function(){
			expect(weekly.isBetween(14, [12, 36])).to.be.true;
		});
	})
});