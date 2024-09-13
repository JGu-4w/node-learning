const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    // 获取用户名和密码
    console.log(ctx.request.body);
    // 校验并存入数据库
    await userService.create();
    // 返回结果
    ctx.body = 'successful';
  }
}

module.exports = new UserController();
