'use strict'

var User = require('../models/user');

class UserService {

	* find(email) {
		return yield User.findOne({ 'email': email }, 'name email').exec();
	}

	* register(user) {
		var userDoc = User({
			displayName: user.displayName,
			email: user.email
		});
		return yield userDoc.save();
	};
}

module.exports = new UserService();