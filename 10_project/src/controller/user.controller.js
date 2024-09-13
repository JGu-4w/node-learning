const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    // 获取用户名和密码
    const user = ctx.request.body;
    // 校验并存入数据库
    const { name, password } = user;
    if (!name || !password) {
      ctx.body = {
        code: -1001,
        message: '请输入用户名和密码',
      };
      return;
    }
    const users = await userService.getUserByName(name);
    if (users.length) {
      ctx.body = {
        code: -1002,
        message: '用户名已被占用',
      };
      return;
    }
    const res = await userService.create(user);
    // 返回结果
    ctx.body = {
      code: 0,
      data: res,
    };
  }
}

module.exports = new UserController();
