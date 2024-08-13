const express = require('express');

const app = express();

// 将POST请求的body内容抽取
// 方法一：手写通用请求处理
// app.use((req, res, next) => {
//   if (req.headers['content-type'] === 'application/json') {
//     req.on('data', (data) => {
//       const body = JSON.parse(data.toString());
//       req.body = body;
//     });

//     req.on('end', () => {
//       next();
//     });
//   } else {
//     next();
//   }
// });

// 方法二：调用express自带中间件
// 解析 application/json
app.use(express.json());
// 解析 x-www-form-urlencoded
// extended 设置为 true 表示使用第三方库 qs 进行解析
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res, next) => {
  console.log(req.body);
});

app.post('/register', (req, res, next) => {
  console.log(req.body);
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
