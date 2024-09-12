class UserController {
  create(ctx, next) {
    // 获取用户名和密码
    console.log(ctx.request.body);
    // 校验并存入数据库

    // 返回结果
  }
}

module.exports = new UserController();
