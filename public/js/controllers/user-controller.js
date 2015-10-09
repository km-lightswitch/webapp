'user strict'
class UserController {

	constructor(userService) {
		this.user = {};
		
		userService.getUser()
			.then((data) => {
				this.user = data;
			});
	}
}

module.exports = UserController;