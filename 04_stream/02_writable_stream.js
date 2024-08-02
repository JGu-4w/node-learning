const fs = require('fs');

const writeStream = fs.createWriteStream('./text.txt', {
  flags: 'a+',
});

writeStream.on('open', (fd) => {
  console.log('文件被打开', fd);
});

writeStream.write('append write content');
writeStream.write('append 22222222');
writeStream.write('append 33333333', (err) => {
  console.log('写入完成: ', err);
});
// 写入完成需要手动调用close
// writeStream.close();

// 或者调用写入并关闭
writeStream.end('hhhhhahahaaaaahhhhh');

writeStream.on('finish', () => {
  console.log('写入结束');
});

writeStream.on('close', () => {
  console.log('文件关闭');
});
