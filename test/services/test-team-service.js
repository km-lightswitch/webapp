var teamService = require('../../api/services/team-service.js');
var db = require('../../api/db');
var _ = require('lodash');
var expect = require('chai').expect;

describe('Team', function () {

	let mongoose;
	before(function () {
		mongoose = db.connect();
		mongoose.connection.collections['teams'].drop();
	})

	it('create new team', function* () {
		let team = yield teamService.create({ "name": "team1", "owner": "user1@test.com" });
		expect(team.id).not.to.be.null;
	});

	it('find team by owner', function* () {
		let ownerEmail = "user2@test.com";
		let name = "team2"

		let team = yield teamService.create({ "name": name, "owner": ownerEmail });
		let teamFromDb = _.first(yield teamService.getOwnedTeams(ownerEmail));

		expect(teamFromDb.name).to.equal(name);
		expect(teamFromDb.owner).to.equal(ownerEmail);
	});

	describe('add member to exiting team', function () {

		it('when team was empty', function* () {
			let members = ["foo", "bar"];
			let ownerEmail = "user3@test.com";
			let name = "team3"
			let team = yield teamService.create({ "name": name, "owner": ownerEmail });

			let teamWithMembers = yield teamService.addMembers(team.owner, team.name, members);
			expect(teamWithMembers.id).to.equal(team.id);
			expect(teamWithMembers.members).to.contain(members[0]);
			expect(teamWithMembers.members).to.contain(members[1]);
		});

		it('when team has exisiting members', function* () {
			let members = ["foo", "bar"];
			var newMembers = ["new member"];
			let ownerEmail = "user4@test.com";
			let name = "team4"
			let team = yield teamService.create({ "name": name, "owner": ownerEmail, "members": members });

			let teamWithMembers = yield teamService.addMembers(team.owner, team.name, newMembers);

			expect(teamWithMembers.members.length).to.equal(3);
			expect(teamWithMembers.members).to.contain(newMembers[0]);
			expect(teamWithMembers.members).to.contain(members[1]);
		});
	});

	describe('return teams', function () {
		it('for owner', function* () {
			let owner = "user5@test.com";
			yield teamService.create({ "name": "team5", "owner": owner });
			let teams = yield teamService.getTeams(owner);
			expect(teams.length).to.equal(1);
		});

		it('for member', function* () {
			let member = "member7@test.com";
			yield teamService.create({ "name": "team6", "owner": "user6@test.com", "members": [member] });
			let teams = yield teamService.getTeams(member);
			expect(teams.length).to.equal(1);
		});
	});

	after(function () {
		mongoose.connection.close();
	})
});