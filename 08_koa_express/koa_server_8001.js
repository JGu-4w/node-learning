const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = {
    code: 0,
    data: [{ id: 1 }, { id: 2 }],
  };
});

app.listen(8001, () => {
  console.log('Start Listening...');
});
