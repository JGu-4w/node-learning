const Koa = require('koa');
const KoaRouter = require('@koa/router');
const fs = require('fs');

const app = new Koa();

const router = new KoaRouter();
router.get('/', (ctx, next) => {
  // // String type
  // ctx.body = 'Hello World';

  // // Buffer
  // ctx.body = Buffer.from('What a nice day!');

  // // Stream
  // const readFileStream = fs.createReadStream(
  //   './uploads/1724315267283_Avatar.jpg'
  // );
  // ctx.type = 'image/jpeg';
  // ctx.body = readFileStream;

  // Array or Object
  // ctx.status = 200
  ctx.body = {
    code: 0,
    data: [{ id: 1 }, { id: 2 }],
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8000, () => {
  console.log('Start Listening...');
});
