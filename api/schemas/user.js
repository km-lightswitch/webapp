var userSchema = {
	name: String,
	email: { type: String, index: true }
}

module.exports = userSchema;