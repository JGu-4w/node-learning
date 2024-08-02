const fs = require('fs');

const readStream = fs.createReadStream('./text.txt', {
  start: 6,
  end: 30,
  highWaterMark: 3, // 每次读取的字节数
});

// 监听当前读取的数据
readStream.on('data', (data) => {
  console.log(data.toString());
  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 1000);
});

readStream.on('open', (fd) => {
  console.log('通过Stream将文件打开', fd);
});

readStream.on('end', () => {
  console.log('已读取到end位置，不设置end则读取到文件最后');
});

readStream.on('close', () => {
  console.log('文件读取结束并且被关闭');
});
