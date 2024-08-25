const Koa = require('koa');

const app = new Koa();
let msg = '';

app.use(async (ctx, next) => {
  console.log('koa middleware 01');
  msg += 'a';
  await next();
  console.log('koa middleware 01 next');
  msg += 'e';
  ctx.body = msg;
});

app.use(async (ctx, next) => {
  console.log('koa middleware 02');
  msg += 'b';
  await next();
  console.log('koa middleware 02 next');
  msg += 'd';
});

app.use(async (ctx, next) => {
  console.log('koa middleware 03');
  msg += 'c';
  const res = await fetch('http://localhost:8001');
  const data = await res.json();
  console.log(data);
});

app.listen(8000, () => {});
