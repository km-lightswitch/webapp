var koa = require('koa');
var router = require('./routes');
var config = require('config');
var db = require('./db');

var app = koa();

app.use(require('koa-file-server')({
  root: 'public'
}));

db.init(app);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
