const userService = require('../service/user.service');
const {
  NAME_OR_PASSWORD_IS_EMPTY,
  NAME_IS_ALREADY_EXISTS,
} = require('../config/error');

const verifyUser = async (ctx, next) => {
  // 校验用户名和密码
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_EMPTY, ctx);
    return;
  }
  const [users] = await userService.getUserByName(name);
  if (users.length) {
    ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx);
    return;
  }
  await next();
};

module.exports = { verifyUser };
