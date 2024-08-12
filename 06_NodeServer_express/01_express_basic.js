const express = require('express');

const app = express();

app.post('/login', (req, res) => {
  res.end('get /login post request');
});

app.get('/home', (req, res) => {
  res.end('get /home get request');
});

app.listen(8000, () => {
  console.log('Start Listening Port 8000...');
});
