var mongoose = require('mongoose');
var config = require('config');

var Db = {
	connect: function () {
		// var username = config.get('db.username');
		// var password = config.get('db.password');
		console.log('Using env - ' + process.env.NODE_ENV);
		var host = config.get('db.host');
		var port = config.get('db.port');
		var database = config.get('db.database');
		console.log('Config env - ' + config.util.getEnv('NODE_ENV'));
		console.log('Connecting to Db - ' + database);

		this.connection = mongoose.connect(`mongodb://${host}:${port}/${database}`);
		return this.connection;
	},

	getModel: function (name) {
		var schema = require('./schemas/' + name);
		return this.connection.model(name, schema);
	},
}

module.exports = Db;