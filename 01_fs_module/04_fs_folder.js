const fs = require('fs')

// create
fs.mkdir('./04', (err) => {
  if (err) return console.log(err)
  return console.log('success')
})

// read
fs.readdir('./04', (err, files) => {
  console.log(files) // [ '04-a', '04-b' ]
})

fs.readdir('./04', { withFileTypes: true }, (err, files) => {
  console.log(files)
})

// rename
fs.rename('./04', './004', (err) => {})
