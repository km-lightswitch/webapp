app.controller("InstancesController", ["instances","organizations", function (instances, organizations) {
	var self = this;
	
	self.instances = instances;
	self.organizations = organizations;
	
}]);