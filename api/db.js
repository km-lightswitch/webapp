var mongoose = require('mongoose');
var config = require('config');

var Db = {
	connect: function () {
		// var username = config.get('db.username');
		// var password = config.get('db.password');
		var host = config.get('db.host');
		var port = config.get('db.port');
		var database = config.get('db.database');

		this.connection = mongoose.connect(`mongodb://${host}:${port}/${database}`);
		return this.connection;
	},

	getModel: function (name) {
		var schema = require('./schemas/' + name);
		return this.connection.model(name, schema);
	},
}

module.exports = Db;