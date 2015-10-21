'use strict'

var ec2 = require('../services/ec2');
var instancesService = require('../services/instances-service');
var instanceOperationsService = require('../services/instance-operations-service')
var credentialsService = require('../services/credentials-service');
var teamService = require('../services/team-service');

class InstancesController {

	* discoverInstances(next) {
		let teamName = this.params.teamName;
		let owner = this.passport.user.email;
		let team = yield teamService.getTeamByName(owner, teamName);

		if (team) {
			var credentials = yield credentialsService.getCredentials(team.id);
			if (credentials) {
				this.body = yield ec2.getInstances(credentials);
			} else {
				this.body = "Please add credentials.";
				this.status = 400;
			}
		}
		return;
	}

	* manageInstances(next) {
		let instances = this.request.body.instances;
		let region = this.request.body.region;
		let owner = this.passport.user.email;

		let teamName = this.params.teamName;
		let team = yield teamService.getTeamByName(owner, teamName);

		var i = 0
		var len = instances.length;
		while (i < len) {
			yield instancesService.manageInstance(instances[i++], region, team.id, owner);
		}
		this.status = 201;
	}

	* getManagedInstances(next) {
		let owner = this.passport.user.email;
		let teamName = this.params.teamName;
		let team = yield teamService.getTeamByName(owner, teamName);

		this.body = yield instancesService.getManagedInstances(team.id);
	}

	* startInstances(next) {
		var instances = this.request.body.instances;
		yield instanceOperationsService.startInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}

	* stopInstances(next) {
		var instances = this.request.body.instances;
		yield instanceOperationsService.stopInstances(instances, this.passport.user.email);
		this.body = 'accepted';
	}
}

module.exports = new InstancesController();