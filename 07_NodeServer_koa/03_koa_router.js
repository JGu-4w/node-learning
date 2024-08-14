const Koa = require('koa');
const userRouter = require('./routers/userRouters');

const app = new Koa();

// 挂载中间件
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log('Start Listening...');
});
