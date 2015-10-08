var db = require('../db')
var Promise = require

var User = db.getModel('user');

class UserService {

	* find(email) {
		return yield User.findOne({ 'email': email }, 'name email').exec();
	}

	* register(user) {
		var userDoc = User({
			name: user.name,
			email: user.email
		});
		return yield userDoc.save();
	};
}

module.exports = UserService;