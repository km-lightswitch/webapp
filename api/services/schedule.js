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
	
	uptoMinutesLimit() {
		return 10;
	}

	getEvent(atTimeString, withinMinutes) {
		if (withinMinutes > this.uptoMinutesLimit()) {
			throw new Error('specify a time limit not exceeding ' + this.uptoMinutesLimit() + ' minutes');
		}
		
		var initialState = this.up(atTimeString);
		var initialMoment = moment(atTimeString).utc();

		var step = 1; //minutes
		var counter = 1;
		var accumulator = 0;
		var instants = [initialMoment];
		while (accumulator < withinMinutes) {
			var nextInstant = initialMoment.add(step, 'minutes');
			instants.push(nextInstant);
			counter += 1;
			accumulator += step;
		}
		
		var foundStateChangeAt = _.find(instants, (atMoment) => {
			var stateAt = this.up(atMoment.format());
			return (stateAt != initialState);
		});

        if (foundStateChangeAt === undefined) {
			return undefined;
		} else {
			var state = this.up(foundStateChangeAt.format());
			return {
				"state": (state ? "up" : "down"),
				"at": foundStateChangeAt.format()
			};
		}
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