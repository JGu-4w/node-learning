const http = require('http');

const server = http.createServer((req, res) => {
  // 方式一：setHeader 单独设置
  // res.setHeader('Content-Type', 'application/json;charset=utf-8;');
  // 方式二：writeHead 与状态码一起进行批量设置
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
  });

  res.end(JSON.stringify({ message: '你好' }));
});

server.listen(8000, () => {
  console.log('Start listening...');
});
