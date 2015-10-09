var Router = require('koa-router')
var router = new Router();
var instancesController = require('./controllers/instances-controller');
var organizationsController = require('./controllers/organizations-controller');
var authController = require('./controllers/auth-controller');

var instancesRoutes = new Router();
instancesRoutes.get('/', instancesController.getInstances);

var organizationsRoutes = new Router();
organizationsRoutes.get('/', organizationsController.getOrganizations);

var authRoutes = new Router();
authRoutes.get('/login', authController.authenticate);
authRoutes.get('/login/callback', authController.handleAuthCallback);
authRoutes.get('/login/error', authController.failure);

router.use('/api/instances', instancesRoutes.routes(), instancesRoutes.allowedMethods());
router.use('/api/organizations', organizationsRoutes.routes(), organizationsRoutes.allowedMethods());
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
