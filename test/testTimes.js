var expect = require('chai').expect;
var moment = require('moment-timezone');
var times = require('../api/services/times.js');

describe('Times', function(){
	describe('#toUTC()', function(){
		it ('converts a time in a specified timezone to corresponding UTC time', function(){
			expect(times.toUTC("2015-11-05T17:40:00+05:30").format()).to.equal("2015-11-05T12:10:00+00:00");
		});
	})
});
