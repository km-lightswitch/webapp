var moment = require('moment-timezone');
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
		var atTimeOfDay = moment(atTimeString).format('hh:mm');
		var dayOfWeek = this.weekdays(atTimeString.day());
		console.log(dayOfWeek);
		var scheduleForDay = this.schedule.schedules[dayOfWeek];
		console.log(scheduleForDay);
		
		return this.isBetween(this.timeOfDay(atTimeOfDay), this.strToTimes(scheduleForDay));
	}
	
	isBetween(time, aryTimes) {
		var min = Math.min(...aryTimes);
		var max = Math.max(...aryTimes);
		return (min <= time) && (time <= max);
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