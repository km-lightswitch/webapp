app.controller("InstancesController", ["instances", "organizations", function (instances, organizations) {
	var self = this;

	self.instances = instances;
	self.organizations = organizations;

	self.start = function () {
		var updatedInstances = _.map(self.instances, function (instance) {
			if (instance.organization == self.currentOrganization && instance.isSelected) {
				instance.state = 'running';
			}
			return instance;
		});
		self.instances = updatedInstances;
	};

	self.stop = function () {
		var updatedInstances = _.map(self.instances, function (instance) {
			if (instance.organization == self.currentOrganization && instance.isSelected) {
				instance.state = 'stopped';
			}
			return instance;
		});
		self.instances = updatedInstances;
	};

}]);