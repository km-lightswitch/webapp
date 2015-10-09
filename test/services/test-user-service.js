var mocha = require('mocha')
var coMocha = require('co-mocha')

coMocha(mocha)

var expect = require('chai').expect;
var mongoose = require('../../api/db').connect();
var UserService = require('../../api/services/user-service.js');
var userService = new UserService();

before(function () {
	mongoose.connection.db.dropDatabase();
})

describe('User', function () {
	describe('#register()', function () {
		it('registers a new user', function* () {
			var user = yield userService.register({ "name": "ajay", "email": "app@user.tv" });
			expect(user.id).not.to.be.null;
		});
	});

	describe('#find()', function () {
		it('finds a registered user by email', function* () {
			yield userService.register({ "name": "vijay", "email": "kunwar@ajay.tv" });
			var user = yield userService.find("kunwar@ajay.tv");
			expect(user.name).to.equal("vijay");
		});
	});
});