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

	createTeam() {
		this.teamService.createTeam(this.newTeamName)
			.then((team) => {
				this.newTeamName = null;
				this.teams.push(team);
				this.successMessage = 'Team created successfully.';
			}).catch((err) => {
				this.errorMessage = 'Could not create team.'
			});
	}

	deleteTeam(name) {
		var team = this.getTeamByName(name);
		this.teamService.deleteTeam(team)
			.then((data) => {
				_.remove(this.teams, team);
				if (this.selectedTeam && this.selectedTeam.name === name) {
					this.selectedTeam = null;
				}
			})
	}

	getTeamByName(name) {
		return _.find(this.teams, (team) => {
			return team.name === name;
		})
	}

	selectTeam(name) {
		this.selectedTeam = this.getTeamByName(name);
	}

	addMember() {
		this.teamService.addMember(this.selectedTeam, this.newMember)
			.then((updatedTeam) => {
				this.updateTeams(updatedTeam)
				this.newMember = null;
			});
	}

	updateTeams(updatedTeam) {
		var index = _.findIndex(this.teams, (team) => {
			return team.name === updatedTeam.name;
		})
		this.teams[index] = updatedTeam;
		this.selectedTeam = updatedTeam;
	}

	removeMember(member) {
		this.teamService.removeMember(this.selectedTeam, member)
			.then((updatedTeam) => this.updateTeams(updatedTeam));;
	}
}

module.exports = TeamController;