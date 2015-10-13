'use strict'
var teamService = require('../services/team-service');
var credentialsService = require('../services/credentials-service');

class TeamController {

	* getTeams(next) {
		this.body = yield teamService.getTeams(this.passport.user.email);
	}

	* createTeam(next) {
		let team = {
			name: this.request.body.name,
			owner: this.passport.user.email,
			members: this.request.body.members || []
		}
		this.body = yield teamService.create(team);
		this.status = 201;
	}

	* deleteTeam(next) {
		let teamName = this.params.teamName;
		this.body = yield teamService.delete(this.passport.user.email, teamName);
	}

	* addMember(next) {
		let teamName = this.params.teamName;
		let member = this.request.body.member;
		this.body = yield teamService.addMember(this.passport.user.email, teamName, member);
	}
	
	* saveCredentials(next) {
		let teamName = this.params.teamName;
		let owner = this.passport.user.email;
		let team = yield teamService.getTeamByName(owner, teamName);
		let credentials = {
			accessKeyId: this.request.body.accessKeyId,
			secretAccessKey: this.request.body.secretAccessKey
		}
		yield credentialsService.create(credentials, team.id, owner);
		this.body = {}
		this.status = 201;
	}

	* removeMember(next) {
		let teamName = this.params.teamName;
		let member = this.request.body.member;
		this.body = yield teamService.removeMember(this.passport.user.email, teamName, member);
	}
}

module.exports = new TeamController();