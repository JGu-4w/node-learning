const http = require('http');

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  console.log(request.headers);
  const { method, url } = request;
  if (url === '/login') {
    if (method === 'POST') {
      response.end(JSON.stringify({ code: 200, data: 'login successfully' }));
    } else {
      response.end(
        JSON.stringify({ code: 400, data: 'Wrong request method.' })
      );
    }
  } else if (url === '/lyric') {
    response.end(JSON.stringify({ code: 200, data: 'bigger dreamer' }));
  } else {
    response.end(JSON.stringify({ code: 404, data: 'API not found.' }));
  }
});
// 一般监听 1024 - 65536 之间的端口
const HTTP_PORT = 8000;
server.listen(HTTP_PORT, () => {
  console.log(`Start listening port ${HTTP_PORT}...`);
});
