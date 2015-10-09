var passport = require('koa-passport');

var authController = {

	authenticate: function* (next) {
		yield passport.authenticate('google', {
			scope: [
				'https://www.googleapis.com/auth/plus.login',
				'https://www.googleapis.com/auth/userinfo.email'
			]
		});
	},

	handleAuthCallback: function* (next) {
		yield passport.authenticate('google', {
			successRedirect: 'http://localhost:3000/index.html',
			failureRedirect: 'http://localhost:3000/auth/login/error'
		})
		yield next;
	},

	failure: function* (next) {
		this.body = 'failed';
	}
}

module.exports = authController;