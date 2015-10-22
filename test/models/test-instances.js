process.env.NODE_ENV = 'test';
var expect = require('chai').expect;

var Instance = require('../../api/models/instance.js');

var myInstance = {
	"instanceId": "i-ab123456",
	"teamId": "5614ba3de23bd3bbccc68671",
	"registeredBy": "5614ba27e23bd3bbccc68670",
	"schedule": {
		"name": "WEEKLY_UPTIME",
		"nature": "uptime",
		"timespan": "weekly",
		"timezone": "+05:30",
		"schedules": {
			"Monday": ["10:00", "19:00"],
			"Tuesday": ["09:30", "19:00"],
			"Wednesday": ["09:30", "19:00"],
			"Thursday": ["09:30", "20:00"],
			"Friday": ["09:30", "17:30"],
			"Saturday": [],
			"Sunday": []
		}
	}
}

describe('Instance', function () {
	describe('#save', function () {
		it("saves a 'fully-formed' instance", function* () {
			var instance = new Instance(myInstance);
			var savedInstance = yield function* () {
				return yield instance.save();
			}
			expect(savedInstance.id).not.to.be.null;

		});
	})
});
