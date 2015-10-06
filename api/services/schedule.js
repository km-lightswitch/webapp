var moment = require('moment-timezone');
var times = require('./times.js');
var _ = require('lodash');

class Schedule {
	constructor(name, schedule) {
		this.name = name;
		this.schedule = schedule;
	}

	weekdays(idx) {
		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][idx];
	}

	up(atTimeString) {
		var atTimeOfDay = moment(atTimeString).utc();
		var scheduleTimeZone = this.schedule.timezone;
		var timeInScheduleTZ = atTimeOfDay.utcOffset(scheduleTimeZone);
		var dayOfWeek = this.weekdays(timeInScheduleTZ.day());
		var scheduleForDay = this.schedule.schedules[dayOfWeek];
		var test = this.isBetween(times.timeOfDay(timeInScheduleTZ.format('hh:mm')), this.strToTimes(scheduleForDay));
		return (this.schedule.nature == 'uptime' ? test : !test);
	}

	isBetween(time, aryTimes) {
		var min = Math.min(...aryTimes);
		var max = Math.max(...aryTimes);
		return (min <= time) && (time <= max);
	}

	strToTimes(strArray) {
		return _.map(strArray, (timeStr) => {
			return times.timeOfDay(timeStr);
		});
	}

};

module.exports = Schedule;