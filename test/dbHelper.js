var env = process.env.NODE_ENV || "test";
var config = require("../api/config/config.json")[env];
var databaseURL = config.databaseURL;

var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

var dropCollection = function dropCollection(name) {
	console.log("Dropping collection", name);
	MongoClient.connect(databaseURL, function (err, db) {
		assert.equal(null, err);
		db.dropCollection(name);
	});
};

module.exports = {
	dropCollection: dropCollection
};
