'use strict'
var moment = require('moment-timezone');
var times = require('./times.js');
var _ = require('lodash');

class Schedule {
	constructor(name, schedule) {
		this.name = name;
		this.schedule = schedule;
	}

	getName() { return this.name; }	
	nature() { return this.schedule.nature;	}
	timespan() { return this.schedule.timespan; }
	timezone() { return this.schedule.timezone; }
	schedules() { return this.schedule.schedules; }

	weekdays(idx) {
		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][idx];
	}

	down(atTimeString) {
		return !(this.up(atTimeString));
	}

	up(atTimeString) {
		var atTimeOfDay = moment(atTimeString).utc();
		var scheduleTimeZone = this.schedule.timezone;
		var timeInScheduleTZ = atTimeOfDay.utcOffset(scheduleTimeZone);
		var dayOfWeek = this.weekdays(timeInScheduleTZ.day());
		var scheduleForDay = this.schedule.schedules[dayOfWeek];
		var test = this.isBetween(times.timeOfDay(timeInScheduleTZ.format('HH:mm')), this.strToTimes(scheduleForDay));
		return (this.schedule.nature == 'uptime' ? test : !test);
	}
	
	downAtTime(timeMoment) {
		return !(this.upAtTime(timeMoment));
	}

	upAtTime(timeMoment) {
		return this.up(timeMoment.format());
	}

	uptoMinutesLimit() {
		return 10;
	}

	getEvent(atTimeString, withinMinutes) {
		if (withinMinutes > this.uptoMinutesLimit()) {
			throw new Error('specify a time limit not exceeding ' + this.uptoMinutesLimit() + ' minutes');
		}

		var initialMoment = moment(atTimeString);
		var initialState = this.upAtTime(initialMoment);

		var step = 1; //minutes
		var accumulator = 0;
		var instants = [ initialMoment ];
		while (accumulator < withinMinutes) {
			var nextInstant = initialMoment.add(step, 'minutes');
			instants.push(nextInstant);
			accumulator += step;
		}

		var foundStateChangeAt = _.find(instants, (atMoment) => {
			var stateAt = this.upAtTime(atMoment);
			return (stateAt != initialState);
		});

        if (foundStateChangeAt === undefined) {
			return undefined;
		} else {
			var state = this.upAtTime(foundStateChangeAt);
			if (state == initialState) {
				throw new Error('inconsistent state change');
			}
			return {
				"state": (state ? "up" : "down"),
				"at": foundStateChangeAt.utc().format()
			};
		}
	}

	isBetween(time, aryTimes) {
		var min = _.min(aryTimes);
		var max = _.max(aryTimes);
		
		return ((min <= time) && (time <= max));
	}

	strToTimes(strArray) {
		return _.map(strArray, (timeStr) => {
			return times.timeOfDay(timeStr);
		});
	}

};

module.exports = Schedule;