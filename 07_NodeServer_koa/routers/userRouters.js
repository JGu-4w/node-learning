const KoaRouter = require('@koa/router');

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/user' });

// 注册中间件
userRouter.get('/', (ctx, next) => {
  console.log(ctx.method);
  ctx.body = 'get user list';
});
userRouter.get('/:id', (ctx, next) => {
  console.log(ctx.method);
  console.log(ctx.params.id);
  ctx.body = 'get user detail';
});
userRouter.post('/', (ctx, next) => {
  console.log(ctx.method);
  ctx.body = 'create user';
});
userRouter.patch('/:id', (ctx, next) => {
  console.log(ctx.method);
  console.log(ctx.params.id);
  ctx.body = 'edit user';
});
userRouter.delete('/:id', (ctx, next) => {
  console.log(ctx.method);
  console.log(ctx.params.id);
  ctx.body = 'delete user';
});

module.exports = userRouter;
