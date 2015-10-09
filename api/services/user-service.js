'use strict'

var User = require('../models/user');

class UserService {

	* find(email) {
		return yield User.findOne({ 'email': email }, 'name email').exec();
	}

	* register(user) {
		var name;
		if (user.displayName) {
			name = user.displayName
		} else name = user.name.givenName;
		
		var userDoc = User({
			name: name,
			email: user.email
		});
		return yield userDoc.save();
	};
}

module.exports = new UserService();