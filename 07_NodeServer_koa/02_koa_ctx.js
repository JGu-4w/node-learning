const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.request); // koa 封装的请求对象
  console.log(ctx.req); // node 封装的请求对象

  console.log(ctx.response); // koa 封装的响应对象
  console.log(ctx.res); // node 封装的响应对象
});

app.listen(8000, () => {});
