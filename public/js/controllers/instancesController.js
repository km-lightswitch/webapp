var app = require('../app.js');
var _ = require('lodash');

var instancesController = app.controller('InstancesController', ['$scope', 'instanceService', 'organizations',
	function ($scope, instanceService, organizations) {
		var controller = this;
		controller.instances = [];
		
		instanceService.getInstances().then(function (data) {
			controller.instances = data;
			$scope.$apply();
		});

		controller.organizations = [{ name: 'All' }].concat(organizations);

		controller.getSelectedInstances = function () {
			return _.filter(controller.instances, function (instance) {
				return instance.organization == controller.currentOrganization && instance.isSelected;
			});
		}

		controller.getInstancesInCurrentOrganization = function () {
			return _.filter(controller.instances, function (instance) {
				return instance.organization == controller.currentOrganization;
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
			var updatedInstances = _.map(controller.getInstancesInCurrentOrganization(), function (instance) {
				instance.isSelected = controller.selectAll;
				return instance;
			});
			controller.instances = updatedInstances;
		};

	}
]);

module.exports = instancesController;