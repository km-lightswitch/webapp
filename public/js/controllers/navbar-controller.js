'user strict'
var _ = require('lodash');

class NavbarController {

	constructor() {
		this.pages = [
			{ title: 'Home', url: '/' },
			{ title: 'Teams', url: '/teams' },
			{ title: 'Schedules', url: '/schedules' }
		];
		this.currentPage = this.pages[0];
	}
	
	selectPage(title) {
		this.currentPage = _.find(this.pages, (page) => {
			return page.title === title;
		});;
	}
}

module.exports = NavbarController;