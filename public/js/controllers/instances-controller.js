'use strict'
var _ = require('lodash');

class InstancesController {

	constructor(instanceService, teamService) {
		this.instances = [];
		this.instanceService = instanceService;
		this.teams = [{ name: 'All' }];

		instanceService.getInstances().then((data) => {
			this.instances = data;
		});

		teamService.getTeams().then((data) => {
			this.teams = this.teams.concat(data);
		})
	}

	getSelectedInstances() {
		return _.filter(this.instances, (instance) => {
			return instance.team === this.currentTeam && instance.isSelected;
		});
	}

	getInstancesInCurrentTeam() {
		return _.filter(this.instances, (instance) => {
			return instance.team === this.currentTeam;
		});
	}

	start() {
		var instances = this.getSelectedInstances();
		this.instanceService.startInstances(instances).then(() => {
			_.forEach(instances, (instance) => {
				instance.state = 'starting..';
			});
		});
	}

	stop() {
		var instances = this.getSelectedInstances();
		this.instanceService.stopInstances(instances).then(() => {
			_.forEach(this.getSelectedInstances(), (instance) => {
				instance.state = 'stopping..';
			});
		});
	}

	toggleSelection() {
		var updatedInstances = _.map(this.getInstancesInCurrentTeam(), (instance) => {
			instance.isSelected = this.selectAll;
			return instance;
		});
		this.instances = updatedInstances;
	}
}

module.exports = InstancesController;