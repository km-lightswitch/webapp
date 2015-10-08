var mongoose = require('mongoose-simple');

var User = mongoose.model('User');

var find = function find(email) {
		return User.findOne({ 'email': email }, 'name email').exec();
};

var register = function register(user) {
	var userDoc = new User().fromDoc({
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