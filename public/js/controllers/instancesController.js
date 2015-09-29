var app = require('../app.js');
var _ = require('lodash');

var instancesController = app.controller('InstancesController', ['instanceService', 'organizationService',
	function (instanceService, organizationService) {
		var controller = this;
		controller.instances = [];
		controller.organizations = [{ name: 'All' }];
		
		instanceService.getInstances().then(function (data) {
			controller.instances = data;
		});

		organizationService.getOrganizations().then(function(data){
			controller.organizations = controller.organizations.concat(data);
		})

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