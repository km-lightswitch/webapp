var userService = require('../../api/services/user-service.js');
var db = require('../../api/db');
var expect = require('chai').expect;

describe('User', function () {

	var mongoose;
	before(function () {
		mongoose = db.connect();
		mongoose.connection.collections['users'].drop();
	})

	describe('#register()', function () {
		it('registers a new user', function* () {
			var user = yield userService.register({ "displayName": "ajay", "email": "app@user.tv" });
			expect(user.id).not.to.be.null;
		});
	});

	describe('#find()', function () {
		it('finds a registered user by email', function* () {
			yield userService.register({ "displayName": "vijay", "email": "kunwar@ajay.tv" });
			var user = yield userService.find("kunwar@ajay.tv");
			expect(user.name).to.equal("vijay");
		});
	});

	after(function () {
		mongoose.connection.close();
	});
});