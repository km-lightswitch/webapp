var app = require("../app.js");
var _ = require("lodash");

var instancesController = app.controller("InstancesController", ["instances", "organizations", function (instances, organizations) {
	var controller = this;

	controller.instances = instances;
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
			instance.state = "running";
		});
	};

	controller.stop = function () {
		_.forEach(controller.getSelectedInstances(), function (instance) {
			instance.state = "stopped";
		});
	};

	controller.toggleSelection = function () {
		var updatedInstances = _.map(controller.getInstancesInCurrentOrganization(), function (instance) {
			instance.isSelected = controller.selectAll;
			return instance;
		});
		controller.instances = updatedInstances;
	};

}]);

module.exports = instancesController;