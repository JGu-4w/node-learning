const fs = require('fs')

fs.open('./01.txt', (err, fd) => {
  if (err) {
    console.log(err)
  } else {
    console.log(fd)
    fs.fstat(fd, (err, stats) => {
      console.log(stats)
    })
  }
})
