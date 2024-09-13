const KoaRouter = require('@koa/router');
const userController = require('../controller/user.controller');

const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.post('/', userController.create);

module.exports = userRouter;
