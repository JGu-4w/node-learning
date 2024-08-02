const fs = require('fs');

// 使用 readFile/writeFile 进行读写文件（一次性读取写入）
// fs.readFile('./text.txt', (err, data) => {
//   fs.writeFile('./text_copy.txt', data, (err) => {
//     console.log('Done', err);
//   });
// });

// 可读可写流
// const readStream = fs.createReadStream('./text.txt');
// const writeStream = fs.createWriteStream('./text_copy.txt');

// readStream.on('data', (data) => {
//   writeStream.write(data);
// });

// writeStream.on('end', () => {
//   writeStream.close();
// });

// 建立管道
const readStream = fs.createReadStream('./text.txt');
const writeStream = fs.createWriteStream('./text_copy.txt');

readStream.pipe(writeStream);
