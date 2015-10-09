var app = require('../app.js');
var _ = require('lodash');

var userController = app.controller('UserController', ['userService',
	function (userService) {
		var controller = this;
		controller.user = {};

		userService.getUser().then(function (data) {
			controller.user = data;
		});
	}
]);

module.exports = userController;