const fs = require('fs')

const content = 'Hello World, Hi Node...'

fs.writeFile('./03.txt', content, { encoding: 'utf8', flag: 'a+' }, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('success')
  }
})
