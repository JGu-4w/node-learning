const userService = require('../service/user.service');
const {
  NAME_OR_PASSWORD_IS_EMPTY,
  NAME_IS_ALREADY_EXISTS,
} = require('../config/error');
const { md5 } = require('../utils/md5Handler');

const verifyUser = async (ctx, next) => {
  // 校验用户名和密码
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_EMPTY, ctx);
    return;
  }
  const users = await userService.getUserByName(name);
  if (users.length) {
    ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx);
    return;
  }
  await next();
};

const encodePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5(password);
  await next();
};

module.exports = { verifyUser, encodePassword };
