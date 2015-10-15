var mongoose = require('mongoose');

var requestedStateAllowedValues = ['start', 'stop'];

var stateChangeRequestSchema = {
	instanceId: {
		type: String,
		required: true
	},
	teamId: {
		type: String,
		required: true
	},
	requestedState: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return (requestedStateAllowedValues.indexOf(v) != -1);
			},
			message: '{VALUE} is not supported as an instance state change'
		}
	},
	requestedAt: { type: Date, required: true },
	requestedBy: { type: String, required: true, default: "System" },
	recordedAt: { type: Date, required: true, default: Date.now }
};

module.exports = mongoose.model('StateChangeRequest', stateChangeRequestSchema);