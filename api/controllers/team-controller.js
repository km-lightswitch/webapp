'use strict'
var teamService = require('../services/team-service');

var teamsController = {

	getTeams: function* (next) {
		this.body = yield teamService.getTeams(this.passport.user.email);
	},

	createTeam: function* (next) {
		let team = {
			name: this.request.body.name,
			owner: this.passport.user.email,
			members: this.request.body.members || []
		}
		this.body = yield teamService.create(team);
		this.status = 201;
	},

	addMembers: function* (next) {
		let teamName = this.request.body.name;
		let members = this.request.body.members;
		this.body = yield teamService.addMembers(this.passport.user.email, teamName, members);
	}
}

module.exports = teamsController;