const crypto = require('crypto');

const md5 = (password) => {
  const hash = crypto.createHash('md5');
  const res = hash.update(password).digest('hex');
  return res;
};

module.exports = {
  md5,
};
