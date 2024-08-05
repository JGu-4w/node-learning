const http = require('http');

const server = http.createServer((req, res) => {
  // .write 写出数据但是没有关闭流
  res.write('aaaa');
  res.write('bbb');
  // .end 写出数据并关闭流
  res.end('end');
});

server.listen(8000, () => {
  console.log('listening...');
});
