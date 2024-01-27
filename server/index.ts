import { WebSocketServer } from 'ws'

const server = new WebSocketServer({ port: 5000 })

server.on('connection', function connection(ws) {
  console.log('New client')

  ws.on('error', console.error)

  ws.on('message', function message(data) {
    if (data instanceof Buffer) {
      ws.send(`echo: ${data.toString()}`)
    }
  })

  ws.on('close', function message(data) {
    console.log(`closed: ${data}`)
  })
})
