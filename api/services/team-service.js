'use strict'
var _ = require('lodash');
var Team = require('../models/team');

class TeamService {

	* getTeams(member) {
		return yield Team.find({ $or: [{ 'members': member }, { 'owner': member }] }, 'name owner members').exec();
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
	
	* delete(owner, teamName) {
		var team = yield this.getTeamByName(owner,teamName);
		return yield team.remove();
	};

	* getTeamByName(owner, teamName) {
		var teams = yield this.getOwnedTeams(owner);
		return _.find(teams, (team) => {
			return team.owner === owner;
		});
	}

	* addMember(owner, teamName, member) {
		var team = yield this.getTeamByName(owner, teamName);
		if (!_.includes(team.members, member)) {
			team.members.push(member);
			return yield team.save();
		} else {
			return team;
		}
	};

	* removeMember(owner, teamName, memberToRemove) {
		var team = yield this.getTeamByName(owner, teamName);
		if (_.includes(team.members, memberToRemove)) {
			team.members.pull(memberToRemove);
			return yield team.save();
		} else {
			return team;
		}
	};
}

module.exports = new TeamService();