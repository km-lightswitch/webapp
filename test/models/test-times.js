var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var moment = require('moment-timezone');
var times = require('../../api/models/times.js');

describe('Times', function () {
	describe('#toUTC()', function () {
		it('converts a time in a specified timezone to corresponding UTC time', function () {
			expect(times.toUTC("2015-11-05T17:40:00+05:30").format()).to.equal("2015-11-05T12:10:00+00:00");
		});
	})
});

describe('Times', function () {
	describe('#timeOfDay()', function () {
		it('converts an hh:mm string to a time of day in minutes since midnight', function () {
			expect(times.timeOfDay("01:23")).to.equal(83);
			expect(times.timeOfDay("12:21")).to.equal((12 * 60) + 21);
		});

		it('complains when an invalid format string is passed in', function () {
			//SHITTY WORKAROUND, SINCE expect(fn).to.throw(Error, /message/) is not working!
			var caughtError = false;
			try {
				times.timeOfDay("23");
			} catch (err) {
				caughtError = true;
				expect(caughtError).to.be.true;
			}

			caughtError = false;
			try {
				times.timeOfDay("25:03");
			} catch (err) {
				caughtError = true;
				expect(caughtError).to.be.true;
			}

			caughtError = false;
			try {
				times.timeOfDay("-5:03");
			} catch (err) {
				caughtError = true;
				expect(caughtError).to.be.true;
			}

			caughtError = false;
			try {
				times.timeOfDay("21:-3");
			} catch (err) {
				caughtError = true;
				expect(caughtError).to.be.true;
			}

			caughtError = false;
			try {
				times.timeOfDay("21:60");
			} catch (err) {
				caughtError = true;
				expect(caughtError).to.be.true;
			}
		});
	})
});

describe('Times', function () {
	describe('#timeOfDayOffset()', function () {
		it('returns today and UTC time when time and timezone are appropriate', function () {
			expect(times.timeOfDayOffset("10:00", "+05:30")).to.eql({
				"day": 0, "time": 270
			});

			expect(times.timeOfDayOffset("5:30", "+05:30")).to.eql({
				"day": 0, "time": 0
			});
			
			expect(times.timeOfDayOffset("14:30", "-09:00")).to.eql({
				"day": 0, "time": ((23 * 60) + 30)
			});			
		});
		
		it('returns yesterday and UTC time when time and timezone are appropriate', function(){
			expect(times.timeOfDayOffset("5:00", "+05:30")).to.eql({
				"day": -1, "time": ((23 * 60) + 30)
			});			
		});
		
		it('returns tomorrow and UTC time when time and timezone are appropriate', function(){
			expect(times.timeOfDayOffset("22:00", "-03:00")).to.eql({
				"day": 1, "time": 60
			});			
		});		
	});
});