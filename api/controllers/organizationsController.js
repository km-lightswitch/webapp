var organizationsController = {

	getOrganizations: function* (next) {
		this.body = [
			{ 'organizationId': 'org-y', 'name': 'Yankee' },
			{ 'organizationId': 'org-x', 'name': 'Xanadu' }
		];
	}

}

module.exports = organizationsController;