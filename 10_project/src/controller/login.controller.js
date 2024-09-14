const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/keys');

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;
    const payload = { id, name };
    const token = jwt.sign(payload, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256',
    });
    ctx.body = { code: 0, message: 'ok', data: { id, name, token } };
  }
}

module.exports = new LoginController();
