const Koa = require('koa');
const KoaRouter = require('@koa/router');

const app = new Koa();
const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.get('/login', (ctx, next) => {
  const isAuth = false;
  if (isAuth) {
    ctx.body = 'success';
  } else {
    ctx.app.emit('error', -1001, ctx);
  }
});

app.use(userRouter.routes());

app.on('error', (code, ctx) => {
  const errorCode = code;
  let message = '';
  switch (errorCode) {
    case -1001:
      message = 'code -1001';
      break;
    case -1002:
      message = 'code -1002';
      break;
    default:
      message = 'code unknow';
      break;
  }

  const body = {
    code: errorCode,
    message,
  };

  ctx.body = body;
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
