var router = require('koa-router')();
var instanceController = require('./controllers/instancesController');
var organizationsController = require('./controllers/organizationsController');

var instancesRoutes = new Routes();
instancesRoutes.get('/', instanceController.getInstancs);

var organizationsRoutes = new Routes();
organizationsRoutes.get('/', organizationsController.getOrganizations);

router.use('/api/instances', instancesRoutes.routes(), instancesRoutes.allowedMethods());
router.use('/api/organizations', organizationsRoutes.routes(), organizationsRoutes.allowedMethods());

module.exports = router;
