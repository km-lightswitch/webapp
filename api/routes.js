var Router = require('koa-router')
var router = new Router();
var secure = require('./filters/secure');

var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');
var teamController = require('./controllers/team-controller');
var instancesController = require('./controllers/instances-controller');

var instancesRoutes = new Router();
instancesRoutes.get('/:teamName', instancesController.getManagedInstances);
instancesRoutes.get('/:teamName/discover', instancesController.discoverInstances);
instancesRoutes.post('/:teamName/manage', instancesController.manageInstances);
instancesRoutes.put('/:teamName/unmanage', instancesController.unmanageInstances);
instancesRoutes.post('/start', instancesController.startInstances);
instancesRoutes.post('/stop', instancesController.stopInstances);

var teamRoutes = new Router();
teamRoutes.get('/', teamController.getTeams);
teamRoutes.post('/', teamController.createTeam);
teamRoutes.delete('/:teamName', teamController.deleteTeam);
teamRoutes.post('/:teamName/members', teamController.addMember);
teamRoutes.get('/:teamName/credentials', teamController.getCredentials);
teamRoutes.post('/:teamName/credentials', teamController.saveCredentials);

//#TODO: Change the delete
teamRoutes.put('/:teamName/members/delete', teamController.removeMember);

var authRoutes = new Router();
authRoutes.get('/login', authController.authenticate);
authRoutes.get('/login/callback', authController.handleAuthCallback);
authRoutes.get('/login/error', authController.failure);

router.get('/api/user', secure, userController.getUser);

router.get('/', function* (next) {
	this.response.redirect('/index.html');
})

router.use('/api/instances', secure, instancesRoutes.routes(), instancesRoutes.allowedMethods());
router.use('/api/teams', secure, teamRoutes.routes(), teamRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

module.exports = router;
