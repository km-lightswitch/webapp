process.env.NODE_ENV = "test";
var expect = require('chai').expect;

var users = require('../api/services/users.js');

describe('User', function() {
	describe('#register()', function() {
		it('registers a new user', function() {
			expect(users.register({"name": "ajay", "email": "app@user.tv"}).id).not.to.be.null;
		});
	});
});