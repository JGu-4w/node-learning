const http = require('http');

// http 发送 get 请求
http.get('http://localhost:8000', (res) => {
  res.on('data', (data) => {
    console.log(data);
    console.log(data.toString());
  });
});

// http 发送 post 请求，末尾需要手动调用 .end() 结束
const req = http.request(
  {
    method: 'POST',
    hostname: 'localhost',
    port: 8000,
  },
  (res) => {
    res.on('data', (data) => {
      console.log(data.toString());
      console.log(JSON.parse(data.toString()));
    });
  }
);

req.end();
