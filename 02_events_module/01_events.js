const EventEmitter = require('events')

const emitter = new EventEmitter()

function handleShow(...args) {
  console.log(args)
}

emitter.on('show', handleShow)

setTimeout(() => {
  emitter.emit('show', 'Hello', 'World', 'Node')

  emitter.off('show', handleShow)

  setTimeout(() => {
    emitter.emit('show', 'Hello', 'World', 'Node')
  }, 1000)
}, 1000)
