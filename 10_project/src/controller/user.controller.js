const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    // 获取用户名和密码
    const user = ctx.request.body;
    // 添加进数据库
    const res = await userService.create(user);
    // 返回结果
    ctx.body = {
      code: 0,
      data: res,
    };
  }
}

module.exports = new UserController();
