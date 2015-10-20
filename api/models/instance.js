var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var instanceSchema = {
	instanceId: {
		type: String,
		required: true
	},

	teamId: {
		type: String,
		required: true
	},
	
	isManaged: {
		type: Boolean,
		default: false
	},

	registeredBy: {
		type: String,
	},

	registeredAt: {
		type: Date,
	},

	schedule: {
		name: { type: String, required: true },
		nature: { type: String, required: true },
		timespan: { type: String, default: 'weekly' },
		timezone: { type: String, required: true },
		schedules: Schema.Types.Mixed
	}
};

var Instance = mongoose.model('Instance', instanceSchema);

module.exports = Instance;