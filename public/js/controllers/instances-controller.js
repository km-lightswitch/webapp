var app = require('../app.js');
var _ = require('lodash');

var instancesController = app.controller('InstancesController', ['instanceService', 'teamService',
	function (instanceService, teamService) {
		var controller = this;
		controller.instances = [];
		controller.teams = [{ name: 'All' }];
		
		instanceService.getInstances().then(function (data) {
			controller.instances = data;
		});

		teamService.getTeams().then(function(data){
			controller.teams = controller.teams.concat(data);
		})

		controller.getSelectedInstances = function () {
			return _.filter(controller.instances, function (instance) {
				return instance.team === controller.currentTeam && instance.isSelected;
			});
		}

		controller.getInstancesInCurrentTeam = function () {
			return _.filter(controller.instances, function (instance) {
				return instance.team === controller.currentTeam;
			});
		}

		controller.start = function () {
			_.forEach(controller.getSelectedInstances(), function (instance) {
				instance.state = 'running';
			});
		};

		controller.stop = function () {
			_.forEach(controller.getSelectedInstances(), function (instance) {
				instance.state = 'stopped';
			});
		};

		controller.toggleSelection = function () {
			var updatedInstances = _.map(controller.getInstancesInCurrentTeam(), function (instance) {
				instance.isSelected = controller.selectAll;
				return instance;
			});
			controller.instances = updatedInstances;
		};

	}
]);

module.exports = instancesController;