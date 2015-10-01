var expect = require('chai').expect;
var users = require('../api/modules/users.js');

describe('User', function () {
	describe('#registerUser()', function () {
		it('registers a new user', function () {
			users.registerUser({ name: 'Pradip', email: 'game_on@gmail.com' })
				.then(function (savedUser) {
					expect(savedUser.id).not.to.be.null;
				});
		});
	})
});