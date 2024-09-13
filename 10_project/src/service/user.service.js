const pool = require('../app/database');

class UserService {
  // 新增用户
  async create(user) {
    const { name, password } = user;
    const statement = 'INSERT INTO `users`(name, password) VALUES(?, ?);';
    const [res] = await pool.execute(statement, [name, password]);
    return res;
  }
  // 查询用户是否存在
  async getUserByName(name) {
    const statement = 'SELECT * FROM `users` WHERE name = ?;';
    const res = await pool.execute(statement, [name]);
    return res;
  }
}

module.exports = new UserService();
