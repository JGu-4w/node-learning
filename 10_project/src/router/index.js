const fs = require('fs');
// 自动读取router文件并加载
const registerRouters = (app) => {
  const files = fs.readdirSync(__dirname);
  for (let file of files) {
    if (file.endsWith('.router.js')) {
      const router = require(`./${file}`);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  }
};

module.exports = registerRouters;
