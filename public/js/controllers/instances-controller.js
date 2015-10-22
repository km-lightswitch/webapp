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
			this.fetchManagedInstances(this.currentTeam);
		});

		$scope.$watch('teamController.selectedTeam', (selectedTeam) => {
			if (!selectedTeam) return;
			this.fetchManagedInstances(selectedTeam.name);
			this.fetchUnmanagedInstances(selectedTeam.name);
		})
	}

	fetchManagedInstances(teamName) {
		if (!teamName)
			return;

		this.instanceService.getInstances(teamName).then((data) => {
			this.instances = data;
		}).catch(() => {
			this.instances = [];
		});
	}

	fetchUnmanagedInstances(teamName) {
		if (!teamName)
			return;

		this.instanceService.discoverInstances(teamName).then((data) => {
			this.unmanagedInstances = _.filter(data, (instance) => {
				return !_.some(this.instances, 'instanceId', instance.InstanceId);
			});
		}).catch(() => {
			this.unmanagedInstances = [];
		});
	}

	getSelectedInstances() {
		return _.filter(this.instances, (instance) => {
			return instance.team === this.currentTeam && instance.isSelected;
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
		var updatedInstances = _.map(this.instances, (instance) => {
			instance.isSelected = this.selectAll;
			return instance;
		});
		this.instances = updatedInstances;
	}

	manageInstance(teamName, instance) {
		this.instanceService.manageInstance(teamName, instance).then(() => {
			this.fetchManagedInstances(teamName);
			this.fetchUnmanagedInstances(teamName);
		})
	}
}

module.exports = InstancesController;