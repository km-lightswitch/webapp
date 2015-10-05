var moment = require('moment-timezone');

var toTimeOfDay = function toTimeOfDay(hhmmStr, tzStr) {
};

var toUTC = function toUTC(timeStr) {
	return moment(timeStr).utc();
};

module.exports = {
	toTimeOfDay: toTimeOfDay,
	toUTC: toUTC
};