const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((request, response) => {
  console.log(request.url);
  const urlString = url.parse(request.url);
  console.log(urlString);

  const query = urlString.query;
  const queryInfo = qs.parse(query);
  console.log(queryInfo);

  response.end('Hello World');
});

server.listen(8000, () => {
  console.log('Start listening ...');
});
