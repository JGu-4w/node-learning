const fs = require('fs');

fs.readFile('./text.txt', (err, data) => {
  console.log(data);
  data[0] = 0x60;
  console.log(data);
});
