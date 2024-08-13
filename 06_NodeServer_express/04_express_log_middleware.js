const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

const writeStream = fs.createWriteStream('./logs/access.log');
app.use(morgan('combined', { stream: writeStream }));

app.post('/login', (req, res, next) => {
  res.end('login successfully');
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
