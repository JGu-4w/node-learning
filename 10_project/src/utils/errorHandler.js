const app = require('../app');
const {
  NAME_OR_PASSWORD_IS_EMPTY,
  NAME_IS_ALREADY_EXISTS,
} = require('../config/error');

app.on('error', (error, ctx) => {
  let code = 0;
  let message = 'ok';

  switch (error) {
    case NAME_OR_PASSWORD_IS_EMPTY:
      code = -1001;
      message = '用户名或密码不能为空';
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = '用户名已被占用';
      break;
    default:
      break;
  }

  ctx.body = { code, message };
});
