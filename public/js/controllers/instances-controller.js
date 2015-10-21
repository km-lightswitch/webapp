'use strict'
var _ = require('lodash');

class InstancesController {

	constructor($scope, instanceService, teamService) {
		this.instances = [];
		this.instanceService = instanceService;
		this.teams = [];

		teamService.getTeams().then((data) => {
			this.teams = this.teams.concat(data);
			this.currentTeam = this.teams[0].name;
			this.fetchInstances(this.currentTeam);
		});

		$scope.$watch('teamController.selectedTeam', (selectedTeam) => {
			if (!selectedTeam) return;
			this.fetchInstances(selectedTeam.name);
		})
	}

	fetchInstances(teamName) {
		if (!teamName)
			return;

		this.instanceService.getInstances(teamName).then((data) => {
			this.instances = data;
		}).catch(() => {
			this.instances = [];
		});
	}

	// getManagedInstances(teamName) {
	// 	if (!teamName)
	// 		return;
			
	// 	this.instanceService.getInstances(teamName).then((data) => {
	// 		this.instances = data;
	// 	}).catch(() => {
	// 		this.instances = [];
	// 	});
	// }

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