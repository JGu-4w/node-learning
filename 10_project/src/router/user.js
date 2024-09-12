const KoaRouter = require('@koa/router');
const userController = require('../controller/user');

const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.post('/', userController.create);

module.exports = userRouter;
