const app = require('../app');
const {
  NAME_OR_PASSWORD_IS_EMPTY,
  NAME_IS_ALREADY_EXISTS,
  NAME_OR_PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
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
    case NAME_OR_PASSWORD_IS_INCORRECT:
      code = -2001;
      message = '用户名或密码错误';
      break;
    case INVALID_TOKEN:
      code = -2002;
      message = '无效TOKEN';
      break;
    default:
      break;
  }

  ctx.body = { code, message };
});
