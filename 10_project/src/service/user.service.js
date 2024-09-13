const pool = require('../app/database');

class UserService {
  async create() {
    const res = await pool.query('select * from `brands`');
    console.log(res);
  }
}

module.exports = new UserService();
