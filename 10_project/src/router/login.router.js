const KoaRouter = require('@koa/router');
const { loginCheck } = require('../middleware/login.middleware');
const loginController = require('../controller/login.controller');

const loginRouter = new KoaRouter({ prefix: '/login' });

loginRouter.post('/', loginCheck, loginController.sign);

module.exports = loginRouter;
