const fs = require('fs')
// 同步
const resSync = fs.readFileSync('./01.txt', { encoding: 'utf8' })
console.log(resSync)
// 异步(callback)
fs.readFile('./01.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
// 异步(Promise)
fs.promises.readFile('./01.txt', { encoding: 'utf8' }).then((err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
