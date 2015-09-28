app.controller("InstancesController", ["instances", "organizations", function (instances, organizations) {
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
		var updatedInstances = _.map(controller.getSelectedInstances(), function (instance) {
			instance.state = "running";
			return instance;
		});
		controller.instances = updatedInstances;
	};

	controller.stop = function () {
		var updatedInstances = _.map(controller.getSelectedInstances(), function (instance) {
			instance.state = "stopped";
			return instance;
		});
		controller.instances = updatedInstances;
	};

	controller.toggleSelection = function () {
		var updatedInstances = _.map(controller.getInstancesInCurrentOrganization(), function (instance) {
			instance.isSelected = controller.selectAll;
			return instance;
		});
		controller.instances = updatedInstances;
	};

}]);