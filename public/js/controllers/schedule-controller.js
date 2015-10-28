'user strict'
var _ = require('lodash');

class ScheduleController {

	constructor() {
		this.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		this.initializeHours();
	}

	initializeHours() {
		this.hours = [];
		for (var index = 0; index < 24; index = index+2) {
			var indexString = index + '';
			this.hours.push(`${indexString.length === 1 ? '0' + indexString : indexString}:00`);
		}
	}

	loadScheduleForInstance(instance) {
		this.schedule = {
			"nature": "uptime",
			"timespan": "weekly",
			"timezone": "+05:30",
			"schedules": {
				"Monday": [{ start: "10:00", end: "19:00" }],
				"Tuesday": [{ start: "09:30", end: "19:00" }],
				"Wednesday": [{ start: "09:30", end: "19:00" }],
				"Thursday": [{ start: "09:30", end: "20:00" }],
				"Friday": [{ start: "09:30", end: "17:30" }],
				"Saturday": [],
				"Sunday": []
			}
		}
	}
}

module.exports = ScheduleController;