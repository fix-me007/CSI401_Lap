import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

// create http
const echoServer = createServer()

// create websocket
const wss = new WebSocketServer({ server: echoServer, path: '/' })

// listen
wss.on('listening', () => {
    console.log(` [echoServer n:${wss.clients.size}] - listening `);
})

wss.on('connection', (ws) => {
    console.log(` [echoServer n:${wss.clients.size}] - new connection `);
    
    ws.on('message', (message) => {
        // byte to str
        const messageStr = message.toString()
        console.log(` [echoServer n:${wss.clients.size}] - res ${messageStr} `);
        ws.send(messageStr)
        console.log(` [echoServer n:${wss.clients.size}] - sent ${messageStr} `);
    })
    ws.on('close', () => {
        console.log(` [echoServer n:${wss.clients.size}] - connection close `);
    })

})

export default echoServer
