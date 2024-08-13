const express = require('express');

const app = express();

// 解析 query
app.get('/list', (req, res, next) => {
  console.log(req.query);
  res.json({
    code: 0,
    message: 'ok',
    data: req.query,
  });
});

// 解析 params
app.get('/list/:id/:page', (req, res, next) => {
  console.log(req.params);
  res.json({
    code: 0,
    message: 'ok',
    data: req.params,
  });
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
