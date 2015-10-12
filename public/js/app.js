var angular = require('angular');
var angularRoute = require('angular-route');
var anularAnimate = require('angular-animate');

var UserService = require('./services/user-service');
var InstanceService = require('./services/instance-service');
var TeamService = require('./services/team-service');

var NavbarController = require('./controllers/navbar-controller')
var UserController = require('./controllers/user-controller')
var InstancesController = require('./controllers/instances-controller')
var TeamController = require('./controllers/team-controller')

var app = angular.module('lightswitch', ['ngRoute', 'ngAnimate']);

app.service('userService', UserService);
app.service('instanceService', InstanceService);
app.service('teamService', TeamService);

app.controller('UserController', UserController);
app.controller('NavbarController', NavbarController);
app.controller('InstancesController', InstancesController);
app.controller('TeamController', TeamController);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/instances.html'
			}).
			when('/teams', {
				templateUrl: 'views/teams.html',
			}).
			when('/schedules', {
				templateUrl: 'views/schedules.html',
			});
	}
]);

module.exports = app;