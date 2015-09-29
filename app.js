var koa = require('koa');
var app = koa();
var router = require('koa-router')();
app.use(require('koa-file-server')({
  root: 'public'
}));

router.get('/api/instances', function* (next) {
  this.body = [
    { 'instanceId': 'i-ab123456', 'state': 'running', 'organisation': 'org-x', 'region': 'eu-west-1' },
    { 'instanceId': 'i-xz123456', 'state': 'stopped', 'organisation': 'org-y', 'region': 'us-east-1' }
  ];
});

router.get('/api/organizations', function* (next) {
  this.body = [
    { 'organizationId': 'org-y', 'name': 'Yankee' },
    { 'organizationId': 'org-x', 'name': 'Xanadu' }
  ];
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
