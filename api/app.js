var koa = require('koa');
var router = require('./routes');
var config = require('config');
var db = require('./db');

var app = koa();
db.connect();

app.use(require('koa-file-server')({
  root: 'public'
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
