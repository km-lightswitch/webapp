var Schedule = require('./schedule');

module.exports = {
	WEEKDAYS_UPTIME: new Schedule("WEEKDAYS_UPTIME", {
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
	}),
	
	WEEKENDS_DOWNTIME: 	new Schedule("WEEKENDS_DOWNTIME", {
		"nature": "downtime",
		"timespan": "weekly",
		"timezone": "+05:30",
		"schedules": {
			"Saturday": ["01:00", "23:30"],
			"Sunday": ["16:00", "20:00"]
		}
	})
};