process.env.NODE_ENV = "test";
var expect = require('chai').expect;

var users = require('../api/services/users.js');

describe('User', function () {
	describe('#register()', function () {
		it('registers a new user', function () {
			users.register({ "name": "ajay", "email": "app@user.tv" }).then(function (user) {
				expect(user.id).not.to.be.null;
			})
		});
	});
});

describe('User', function () {
	describe('#find()', function () {
		it('finds a registered user by email', function () {
			users.register({ "name": "vijay", "email": "kunwar@ajay.tv" }).then(function (savedUser) {
				(users.find("kunwar@ajay.tv")).then(function (user) {
					expect(user.name).to.equal("vijay");
				})
			});
		});
	});
});

var dbHelper = require('./dbHelper.js');
dbHelper.dropCollection("users");