const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  console.log(req.headers);
  res.end('show header successfully.');
});

server.listen(8000);
