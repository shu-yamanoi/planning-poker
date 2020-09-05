const express = require('express');
const {Nuxt, Builder} = require('nuxt')

const app = express();

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.set('port', port)

let config = require('../nuxt.config.js')


async function start() {
  const nuxt = new Nuxt(config)

  if(config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }


  app.use(nuxt.render)

  let server = app.listen(port, host)

  console.log('Server listening on http://' + host + ':' + port)

  socketStart(server)

  console.log('Socket.IO starts')

}


function socketStart(server) {
  const io = require('socket.io').listen(server)

  io.on('connection', socket => {
    console.log('id: ' + socket.id + 'is connected')
    socket.on('send-message', data => {
      console.log(data.message)
      socket.emit('new-message', data)
    })
  })
}

start()
