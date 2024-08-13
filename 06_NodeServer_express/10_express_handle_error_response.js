const express = require('express');

const app = express();

// 解析 application/json
app.use(express.json());

// next() 中可以传入错误信息
app.post('/login', (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    next(-1001);
  } else if (username !== 'apple' || password !== 'banana') {
    next(-1002);
  } else {
    res.json({
      code: 0,
      message: 'ok',
      token: 'asdfghjkl',
    });
  }
});

// 将错误信息独立处理，使代码更加清晰
app.use((err, req, res, next) => {
  console.log(err);
  let message = 'Unknown error';
  switch (err) {
    case -1001:
      message = 'Need to input username and password.';
      break;
    case -1002:
      message = 'Wrong password.';
    default:
      break;
  }
  res.json({
    code: err,
    message,
  });
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
