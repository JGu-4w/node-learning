const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  req.setEncoding('binary');

  const boundary = req.headers['content-type']
    .split('; ')[1]
    .replace('boundary=', '');

  let formData = '';
  req.on('data', (data) => {
    formData += data;
  });

  req.on('end', () => {
    const imgType = 'image/jpeg';
    const imgTypePosition = formData.indexOf(imgType) + imgType.length;

    let imgData = formData.substring(imgTypePosition);
    imgData = imgData.replace(/^\s\s*/, '');
    imgData = imgData.substring(0, imgData.indexOf(`--${boundary}--`));

    fs.writeFile('./img01.jpg', imgData, 'binary', (err) => {
      console.log('upload successfully.');
      res.end('success');
    });
  });
});

server.listen(8000, () => {
  console.log('Start listening...');
});
