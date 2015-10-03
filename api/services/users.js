var mongoose = require('mongoose');

var env = process.env.NODE_ENV || "development";
var config = require("../config/config.json")[env];
mongoose.connect(config.databaseURL);

var Schema = mongoose.Schema;
var userSchema = new Schema({
	name: String,
	email: { type: String, index: true }
});

var User = mongoose.model('User', userSchema);

var find = function find(email) {
		return User.findOne({ 'email': email }, 'name email').exec();
};

var register = function register(user) {
	var userDoc = new User({
		name: user.name,
		email: user.email
	});

	return new Promise(function (resolve, reject) {
		userDoc.save()
			.then(function (savedUser) {
				resolve(savedUser);
			})
			.catch(function (error) {
				console.error(error);
				reject(error);
			})
	});
};

module.exports = {
	register: register,
	find: find
};