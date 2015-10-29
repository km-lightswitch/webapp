process.env.NODE_ENV = 'test';
var expect = require('chai').expect;

var db = require('../../api/db');

var Instance = require('../../api/models/instance.js');

var myInstance = {
	"instanceId": "i-ab123456",
	"teamId": "5614ba3de23bd3bbccc68671",
	"region": "eu-west-1",
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
	let mongoose;
	beforeEach(function() {
		mongoose = db.connect();
		mongoose.connection.collections['instances'].drop();
	})
	
	describe('#save', function () {
		it("saves a 'fully-formed' instance", function* () {
			
				var savedInstance = function* () {
					yield (Instance(myInstance)).save(function(err) {
						console.log(err);
					});
				};
				
			let instance = savedInstance();
			expect(instance.id).not.to.be.null;
		});
	})
	
	afterEach(function() {
		mongoose.connection.collections['instances'].drop();
		mongoose.connection.close();
	})
});
