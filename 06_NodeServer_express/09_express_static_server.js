const express = require('express');

const app = express();
// 设置静态资源服务器
app.use(express.static('./uploads'));

app.listen(8000, () => {
  console.log('Start Listening...');
});
