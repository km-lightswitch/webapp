var Router = require('koa-router')
var router = new Router();
var instancesController = require('./controllers/instancesController');
var organizationsController = require('./controllers/organizationsController');

var instancesRoutes = new Router();
instancesRoutes.get('/', instancesController.getInstances);

var organizationsRoutes = new Router();
organizationsRoutes.get('/', organizationsController.getOrganizations);

router.use('/api/instances', instancesRoutes.routes(), instancesRoutes.allowedMethods());
router.use('/api/organizations', organizationsRoutes.routes(), organizationsRoutes.allowedMethods());

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
