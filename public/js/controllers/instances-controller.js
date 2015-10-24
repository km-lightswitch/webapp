'use strict'
var _ = require('lodash');

class InstancesController {

	constructor($scope, instanceService, teamService) {
		this.instances = [];
		this.instanceService = instanceService;
		this.teams = [];
		this.regions = ["eu-west-1a", "eu-west-1b", "eu-west-2a", "eu-west-2b"];

		teamService.getTeams().then((data) => {
			this.teams = this.teams.concat(data);
			this.currentTeam = this.teams[0].name;
			if (this.instances.length === 0) {
				this.reloadInstances(this.currentTeam);
			}
		});

		$scope.$watch('teamController.selectedTeam', (selectedTeam) => {
			if (selectedTeam) {
				this.reloadInstances(selectedTeam.name);
			}
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
			this.decorateManagedInstances(data);
			this.unmanagedInstances = _.filter(data, (instance) => {
				return !_.some(this.instances, 'InstanceId', instance.InstanceId);
			});
		}).catch(() => {
			this.unmanagedInstances = [];
		});
	}

	decorateManagedInstances(instancesWithMetadata) {
		for (var index = 0; index < this.instances.length; index++) {
			var instance = this.instances[index];
			var instanceWithTags = _.find(instancesWithMetadata, 'InstanceId', instance.instanceId);
			if (instanceWithTags) {
				this.instances[index].InstanceId = instanceWithTags.InstanceId;
				this.instances[index].AvailabilityZone = instanceWithTags.AvailabilityZone;
				this.instances[index].Name = instanceWithTags.Name;
				this.instances[index].Environment = instanceWithTags.Environment;
				this.instances[index].State = instanceWithTags.State;
			}
		}
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

	reloadInstances(teamName) {
		this.fetchManagedInstances(teamName);
		this.fetchUnmanagedInstances(teamName);
	}

	manageInstance(teamName, instance) {
		this.instanceService.manageInstance(teamName, instance).then(() => {
			this.reloadInstances(teamName);
		})
	}

	unmanageInstance(teamName, instance) {
		this.instanceService.unmanageInstance(teamName, instance).then(() => {
			this.reloadInstances(teamName);
		})
	}
}

module.exports = InstancesController;