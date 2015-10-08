var ec2 = require('../services/ec2');

var instancesController = {

	getInstances: function* (next) {
		this.body = yield ec2.getInstances();
	}
}

module.exports = instancesController;