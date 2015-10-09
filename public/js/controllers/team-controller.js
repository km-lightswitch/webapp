'user strict'
class TeamController {

	constructor(teamService) {
		this.teams = {};

		teamService.getTeams()
			.then((data) => {
				this.teams = data;
			});
	}
}

module.exports = TeamController;