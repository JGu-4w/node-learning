const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('../router/user');

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
