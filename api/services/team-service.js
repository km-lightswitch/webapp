'use strict'
var _ = require('lodash');
var Team = require('../models/team');

class TeamService {

	* getTeams(member) {
		return yield Team.find({ 'member': member }, 'name owner members').exec();
	}

	* getOwnedTeams(owner) {
		return yield Team.find({ 'owner': owner }, 'name owner members').exec();
	}

	* create(team) {
		var doc = Team({
			name: team.name,
			owner: team.owner,
			members: team.members
		});
		return yield doc.save();
	};

	* addMembers(owner, teamName, members) {
		var teams = yield this.getOwnedTeams(owner);
		let team = _.find(teams, (team) => {
			return team.owner === owner;
		});

		_.forEach(members, (member) => {
			if (!_.includes(team.members, member)) {
				team.members.push(member);
			}
		});
		return yield team.save();
	};
}

module.exports = new TeamService();