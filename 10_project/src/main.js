const Koa = require('koa');
const KoaRouter = require('@koa/router');
const { SERVER_PORT } = require('./config/server');

const app = new Koa();
const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.get('/list', (ctx, next) => {
  ctx.body = '/user/list';
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log('Start Listening ...');
});
