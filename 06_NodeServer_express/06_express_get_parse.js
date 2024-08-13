const express = require('express');

const app = express();

// 解析 query
app.get('/list', (req, res, next) => {
  console.log(req.query);
  res.end('get list query');
});

// 解析 params
app.get('/list/:id/:page', (req, res, next) => {
  console.log(req.params);
  res.end('get list params');
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
