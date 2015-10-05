var moment = require('moment-timezone');
var _ = require('lodash');

class Schedule {
	constructor(name, schedule) {
		this.name = name;
		this.schedule = schedule;
	}

	up(atTimeString) {
		var atTime = moment(atTimeString);
		var dayOfWeek = atTime.day();
		var scheduleForDay = this.schedule.schedules[dayOfWeek];
		return false;
	}

	timeOfDay(str) {
		var hours = parseInt(str.split(':')[0]);
		var minutes = parseInt(str.split(':')[1]);
		return ((hours * 60) + minutes);
	}

	strToTimes(strArray) {
		return _.map(strArray, (timeStr) => {
			return this.timeOfDay(timeStr);
		});
	}

};

module.exports = Schedule;