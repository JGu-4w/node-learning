const http = require('http');

const server = http.createServer((request, response) => {
  console.log(request);
  response.end('Hello World');
});
// 一般监听 1024 - 65536 之间的端口
const HTTP_PORT = 8000;
server.listen(HTTP_PORT, () => {
  console.log(`Start listening port ${HTTP_PORT}...`);
});
