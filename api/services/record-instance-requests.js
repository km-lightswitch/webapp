var mongoose = require('mongoose');
var MongoClient = require('mongoose').MongoClient;
var Schema = mongoose.Schema;

var requestedStateAllowedValues = ['start', 'stop'];

var stateChangeRequestSchema = new Schema({
	instanceId: {
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
});

var StateChangeRequest = mongoose.model('StateChangeRequest', stateChangeRequestSchema);

var resolveStateChangeRequest = function resolveStateChangeRequest(nextNMinutes) {
	//Find and save state change requests in the next n minutes
};