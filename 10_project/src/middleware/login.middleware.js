const jwt = require('jsonwebtoken');
const {
  NAME_OR_PASSWORD_IS_INCORRECT,
  NAME_OR_PASSWORD_IS_EMPTY,
  INVALID_TOKEN,
} = require('../config/error');
const { PUBLIC_KEY } = require('../config/keys');
const { getUserByName } = require('../service/user.service');
const { md5 } = require('../utils/md5Handler');

const loginCheck = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_EMPTY);
    return;
  }

  const users = await getUserByName(name);
  // 是否存在该用户名
  if (!users.length) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_INCORRECT);
  }
  // 密码是否正确
  const user = users[0];
  if (user.password !== md5(password)) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_INCORRECT);
    return;
  }
  ctx.user = user;

  await next();
};

const verifyToken = async (ctx, next) => {
  const { authorization } = ctx.headers;
  const token = authorization.replace('Bearer ', '');
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    ctx.user = res;
    await next();
  } catch (err) {
    ctx.app.emit('error', INVALID_TOKEN, ctx);
  }
};

module.exports = { loginCheck, verifyToken };
