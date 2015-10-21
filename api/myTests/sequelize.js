var Sequelize = require("sequelize");

var options = {};
var sequelize = new Sequelize('sql_test', 'sql', 'sql', options);

var User = sequelize.define('user', {
	name: Sequelize.STRING
});

User.sync().then(function(){
	var user = User.build({name: "ajay"});
	user.save();
});