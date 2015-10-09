'use strict'
var userController = {

	getUser: function* (next) {
		var user = this.passport.user;
		this.body = {
			email: user.email,
			name: user.name,
			picture: user.picture
		}
	}
}

module.exports = userController;