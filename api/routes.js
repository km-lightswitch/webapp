var Router = require('koa-router')
var router = new Router();
var secure = require('./filters/secure');

var instancesController = require('./controllers/instances-controller');
var teamController = require('./controllers/team-controller');
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');

var instancesRoutes = new Router();
instancesRoutes.get('/', instancesController.getInstances);
instancesRoutes.post('/start', instancesController.startInstances);
instancesRoutes.post('/stop', instancesController.stopInstances);

var teamRoutes = new Router();
teamRoutes.get('/', teamController.getTeams);
teamRoutes.post('/', teamController.createTeam);
teamRoutes.delete('/:teamName', teamController.deleteTeam);
teamRoutes.post('/:teamName/members', teamController.addMember);
teamRoutes.put('/:teamName/members/delete', teamController.removeMember);

var authRoutes = new Router();
authRoutes.get('/login', authController.authenticate);
authRoutes.get('/login/callback', authController.handleAuthCallback);
authRoutes.get('/login/error', authController.failure);

router.get('/api/user', secure, userController.getUser);

router.use('/api/instances', secure, instancesRoutes.routes(), instancesRoutes.allowedMethods());
router.use('/api/teams', secure, teamRoutes.routes(), teamRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

/*

/teams/
/teams/:teamId
/teams/:teamId/instances
/teams/:teamId/instances/:instanceId/start
/teams/:teamId/instances/:instanceId/stop
/teams/:teamId/instances/:instanceId/manage
/teams/:teamId/instances/:instanceId/unmanage

/teams/:teamId/users

/users

/login
/register

*/

module.exports = router;
