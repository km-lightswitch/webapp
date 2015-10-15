'user strict'
var _ = require('lodash');

class TeamController {

	constructor(teamService) {
		this.teams = {};
		this.teamService = teamService;
		this.showEditCredentialView = false;

		teamService.getTeams()
			.then((data) => {
				this.teams = data;
				if (this.teams.length > 0) {
					this.selectTeam(this.teams[0].name);
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
		this.fetchCredentials();
		if (!this.selectedTeam.accessKeyId) {
			this.showEditCredentialView = true;
		}
	}

	fetchCredentials() {
		this.teamService.getCredentials(this.selectedTeam)
			.then((data) => {
				this.selectedTeam.accessKeyId = data.accessKeyId;
				this.showEditCredentialView = false;
			});

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
		this.selectTeam(updatedTeam);
	}

	removeMember(member) {
		this.teamService.removeMember(this.selectedTeam, member)
			.then((updatedTeam) => this.updateTeams(updatedTeam));;
	}

	editCredentials() {
		this.showEditCredentialView = true;
	}

	saveCredentials() {
		this.teamService.saveCredentials(this.selectedTeam, this.accessKeyId, this.secretAccessKey)
			.then(() => {
				this.accessKeyId = null;
				this.secretAccessKey = null;
				this.showEditCredentialView = false;
				this.fetchCredentials();
			})
	}
}

module.exports = TeamController;