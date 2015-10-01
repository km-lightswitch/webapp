var env = process.env.NODE_ENV || "development";
var config = require("../config/config.json")[env];
var Sequelize = require("sequelize");


var sequelize = new Sequelize(config.database, config.username, config.password, config.options);

var User = sequelize.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}}
});

User.sync();

var registerUser = function (user) {
	var user = User.build({
		name: user.name,
		email: user.email
	});
	
	return new Promise(function(resolve, reject){
		user
		.save()
		.then(function(savedUser){
			resolve(savedUser);
			})
		.catch(function(error){
			console.error(error);
			reject(error);
			});
	});
};

module.exports = {
	registerUser: registerUser
};