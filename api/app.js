var koa = require('koa');
var router = require('./routes');
var app = koa();

app.use(require('koa-file-server')({
  root: 'public'
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
