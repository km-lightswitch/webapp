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
	
	deleteTeam: function* (next) {
		let teamName = this.params.teamName;
		this.body = yield teamService.delete(this.passport.user.email, teamName);
	},

	addMember: function* (next) {
		let teamName = this.params.teamName;
		let member = this.request.body.member;
		this.body = yield teamService.addMember(this.passport.user.email, teamName, member);
	},

	removeMember: function* (next) {
		let teamName = this.params.teamName;
		let member = this.request.body.member;
		this.body = yield teamService.removeMember(this.passport.user.email, teamName, member);
	}
}

module.exports = teamsController;