var users = require('../services/users.js')
var teams = require('../services/teams.js');

users.register({ "name": "vijay", "email": "ram@rajya.com" })
	.then(function (user) {
		teams.create("vaanar_sena", user)
			.then(function (team) {
				console.log("Created team", team);
			})
	})