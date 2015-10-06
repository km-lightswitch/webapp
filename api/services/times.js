var moment = require('moment-timezone');

var timeOfDay = function timeOfDay(str) {
	if ((str.split(':')).length != 2) {
		throw new TypeError("Invalid HH:mm string");
	}

	var hours = parseInt(str.split(':')[0]);
	if (hours < 0 || hours > 24) {
		throw new TypeError("Invalid hour " + hours);
	}

	var minutes = parseInt(str.split(':')[1]);
	if (minutes < 0 || minutes > 59) {
		throw new TypeError("Invalid minute " + minutes);
	}

	return ((hours * 60) + minutes);
};

var minutesInADay = 24 * 60;

var timeOfDayOffset = function timeOfDayOffset(str, offset) {
	var tzPlus = offset[0];
	var tzOffsetMinutes = this.timeOfDay(offset.slice(1));
	var timeOfDay = this.timeOfDay(str);
	if (tzPlus == '+') {
		var calculated = timeOfDay - tzOffsetMinutes;
		return (calculated < 0 ?
			{ "day": -1, "time": (calculated + minutesInADay) }
			: { "day": 0, "time": calculated });
	} else {
		var calculated = timeOfDay + tzOffsetMinutes;
		return (calculated > minutesInADay ?
			{ "day": 1, "time": (calculated - minutesInADay) }
			: { "day": 0, "time": calculated });
	}
};


var toUTC = function toUTC(timeStr) {
	return moment(timeStr).utc();
};

module.exports = {
	timeOfDay: timeOfDay,
	timeOfDayOffset: timeOfDayOffset,
	toUTC: toUTC
};