var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var instanceSchema = {
	instanceId: {
		type: String,
		required: true
	},

	region: {
		type: String,
		required: true
	},

	teamId: {
		type: String,
		required: true
	},

	registeredBy: {
		type: String,
	},

	registeredAt: {
		type: Date,
	},

	schedule: {
		name: String,
		nature: String,
		timespan: String,
		timezone: String,
		schedules: Schema.Types.Mixed
	}
};

var Instance = mongoose.model('Instance', instanceSchema);

module.exports = Instance;