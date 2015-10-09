var secure = function* (next) {
	if (this.isAuthenticated && this.isAuthenticated()) {
		yield next;
	} else {
		this.redirect('/auth/login');
	}
}

module.exports = secure;