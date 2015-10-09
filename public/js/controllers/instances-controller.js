'use strict'
var _ = require('lodash');

class InstancesController {

	constructor(instanceService, teamService) {
		this.instances = [];
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
		_.forEach(this.getSelectedInstances(), (instance) => {
			instance.state = 'running';
		});
	}

	stop() {
		_.forEach(this.getSelectedInstances(), (instance) => {
			instance.state = 'stopped';
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