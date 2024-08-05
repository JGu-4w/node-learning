const http = require('http');

const server = http.createServer((req, res) => {
  // 方式一：响应状态码
  // res.statusCode = 401;
  // res.end('Need to login');

  // 方式二：writeHead 设置状态码
  res.writeHead(405, {
    // headers config
    aaaa: '123123',
  });
  res.end('finish');
});

server.listen(8000, () => {
  console.log('Start listening...');
});
