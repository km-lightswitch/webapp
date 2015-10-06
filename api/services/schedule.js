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
		var dayOfWeek = this.weekdays(atTimeOfDay.day());
		var scheduleForDay = this.schedule.schedules[dayOfWeek];
		var scheduleTimeZone = this.schedule.timezone;
		var test = this.isBetween(times.timeOfDay(atTimeOfDay.format('hh:mm')), this.strToTimes(scheduleForDay, scheduleTimeZone));
		return (this.schedule.nature == 'uptime' ? test : !test);
	}
	
	isBetween(time, aryTimes) {
		var min = Math.min(...aryTimes);
		var max = Math.max(...aryTimes);
		return (min <= time) && (time <= max);
	}
	
	timeOfDayOffset(str, offset) {
		var tzPlus = offset[0];
		var tzOffsetMinutes = times.timeOfDay(offset.slice(1));
		var timeOfDay = times.timeOfDay(str);
		if (tzPlus == '+') {
			return timeOfDay - tzOffsetMinutes;
		} else {
			return timeOfDay + tzOffsetMinutes;			
		}
	}

	strToTimes(strArray, offset) {
		return _.map(strArray, (timeStr) => {
			return this.timeOfDayOffset(timeStr, offset);
		});
	}

};

module.exports = Schedule;