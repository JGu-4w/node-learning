const KoaRouter = require('@koa/router');
const userController = require('../controller/user.controller');
const { verifyUser, encodePassword } = require('../middleware/user.middleware');

const userRouter = new KoaRouter({ prefix: '/user' });

userRouter.post('/', verifyUser, encodePassword, userController.create);

module.exports = userRouter;
