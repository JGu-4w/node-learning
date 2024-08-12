const http = require('http');

const server = http.createServer((req, res) => {
  req.setEncoding('utf-8');
  // req 本质是一个 readable stream
  req.on('data', (data) => {
    console.log(data);
    console.log(JSON.parse(data));
  });

  req.on('end', () => {
    res.end('success');
  });
});

server.listen(8000, () => {
  console.log('Start listening...');
});
