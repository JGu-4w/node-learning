const Koa = require('koa');

const app = new Koa();
let msg = '';

app.use((ctx, next) => {
  console.log('koa middleware 01');
  msg += 'a';
  next();
  ctx.body = msg;
});

app.use((ctx, next) => {
  console.log('koa middleware 02');
  msg += 'b';
  next();
});

app.use((ctx, next) => {
  console.log('koa middleware 03');
  msg += 'c';
  next();
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
