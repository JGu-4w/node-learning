const Koa = require('koa');
const KoaRouter = require('@koa/router');
const multer = require('@koa/multer');

const app = new Koa();

// const upload = multer({
//   dest: './uploads',
// });

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads');
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
});

// 注册路由
const uploadRouter = KoaRouter({ prefix: '/upload' });
// 单文件上传
uploadRouter.post('/avatar', upload.any('avatar'), (ctx, next) => {
  console.log(ctx.request.files);
  ctx.body = 'avatar uploaded successfully';
});
// 多文件上传
uploadRouter.post('/files', upload.array('files'), (ctx, next) => {
  console.log(ctx.request.files);
  ctx.body = 'files uploaded successfully';
});

app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());

app.listen(8000, () => {
  console.log('Start Listening...');
});
