const express = require('express');

const app = express();

// 通用中间件
app.use((req, res, next) => {
  console.log('first middleware');
  next();
});

// 路径匹配中间件
app.use('/login', (req, res, next) => {
  console.log('second middleware');
  next();
});

// 路径+方法匹配
app.get('/login', (req, res, next) => {
  console.log('third middleware');
  res.end('get request');
});

// 注册多个中间件，用于拆分复杂操作
app.get(
  '/home',
  (req, res, next) => {
    console.log('get /home middleware1');
    next();
  },
  (req, res, next) => {
    console.log('get /home middleware2');
    next();
  },
  (req, res, next) => {
    console.log('get /home middleware3');
    next();
  },
  (req, res, next) => {
    console.log('get /home middleware4');
  }
);

app.listen(8000, () => {
  console.log('Start Listening...');
});
