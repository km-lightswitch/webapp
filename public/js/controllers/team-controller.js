'user strict'
var _ = require('lodash');

class TeamController {

	constructor(teamService) {
		this.teams = {};
		this.teamService = teamService;

		teamService.getTeams()
			.then((data) => {
				this.teams = data;
				if (this.teams.length > 0) {
					this.selectedTeam = this.teams[0];
				}
			});
	}

	selectTeam(name) {
		this.selectedTeam = _.find(this.teams, (team) => {
			return team.name === name;
		})
	}
	
	addMember(){
		this.teamService.addMember(this.selectedTeam, this.newMember);
	}
}

module.exports = TeamController;