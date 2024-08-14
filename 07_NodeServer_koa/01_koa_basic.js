const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  // 可通过 ctx.body 直接响应数据
  ctx.body = 'Hello World';
});

app.listen(8000, () => {
  console.log('koa server start listening...');
});
