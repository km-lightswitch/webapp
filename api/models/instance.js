var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var instanceSchema = new Schema({
	instanceId: {
		type: String,
		required: true
	},

	teamId: {
		type: String,
		required: true
	},

	registeredBy: {
		type: String,
		required: true
	},

	registeredAt: {
		type: Date,
		default: Date.now
	},

	schedule: {
		name: { type: String, required: true },
		nature: { type: String, required: true },
		timespan: { type: String, default: 'weekly' },
		timezone: { type: String, required: true },
		schedules: Schema.Types.Mixed
	}
});

var Instance = mongoose.model('Instance', instanceSchema);

module.exports = Instance;