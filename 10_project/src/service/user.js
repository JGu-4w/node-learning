const mysql = require('mysql2/promise');

class UserService {
  create() {
    console.log('保存至数据库');
  }
}

module.exports = new UserService();
