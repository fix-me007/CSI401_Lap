import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

// create http
const forwardServer = createServer()

// create websocket
const wss = new WebSocketServer({ server: forwardServer, path: '/' })

// listen
wss.on('listening', () => {
    console.log(` [forwardServer n:${wss.clients.size}] - listening `);
})

wss.on('connection', (ws) => {
    console.log(` [forwardServer n:${wss.clients.size}] - new connection `);
    
    ws.on('message', (message) => {
        const messageStr = message.toString()
        console.log(` [forwardServer n:${wss.clients.size}] - res ${message} `);
        wss.clients.forEach((client) => {
            client.send(messageStr)
        })
        console.log(` [forwardServer n:${wss.clients.size}] - send ${messageStr}, for ${wss.clients.size} times`);
    })
    ws.on('close', () => {
        console.log(` [forwardServer n:${wss.clients.size}] - connection close `);
    })

})

export default forwardServer
