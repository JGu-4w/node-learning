const Koa = require('koa');
const KoaRouter = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const multer = require('@koa/multer');

const app = new Koa();
const formdata = multer();
app.use(bodyParser());

const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.get('/', (ctx, next) => {
  // query (?attr1=value1&attr2=value2)
  console.log(ctx.request.query);
  ctx.body = 'GET method';
});
userRouter.get('/:id', (ctx, next) => {
  // params (/:id)
  console.log(ctx.request.params);
  ctx.body = 'GET method';
});

// POST 请求中的 body 需要通过第三方插件 koa-bodyparser 解析
// application/json
userRouter.post('/json', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'json body ' + JSON.stringify(ctx.request.body);
});
// x-www-form-urlencode
userRouter.post('/urlencode', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'urlencode body ' + JSON.stringify(ctx.request.body);
});

// POST 请求中的 form-data 格式需要使用 @koa/multer 解析
// form-data
userRouter.post('/formdata', formdata.any(), (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'formdata body ' + JSON.stringify(ctx.request.body);
});

app.use(userRouter.routes());

app.listen(8000, () => {
  console.log('Start Listening...');
});
