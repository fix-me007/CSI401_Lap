import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

const broadcastServer = createServer()

const wss = new WebSocketServer({ server: broadcastServer })

let counter = 0

wss.on('listening', () => {
    console.log(` [broadcastServer n:${wss.clients.size}] - listening `);
    setInterval(()=>{
        if(wss.clients.size === 0) return
        wss.clients.forEach((client) => {
            client.send(`Hello ${counter}`)
        });
        console.log(`[broadcastServer n:${wss.clients.size}] - sent Hello ${counter} x ${wss.clients.size} times`);
        counter++
    }, 1000)
})

wss.on('connection', (ws) => {
    console.log(` [broadcastServer n:${wss.clients.size}] - new connection `);

    ws.on('message', (message) => {
        // byte to str
        const messageStr = message.toString()
        console.log(` [broadcastServer n:${wss.clients.size}] - res ${messageStr} `);
        // ws.send(messageStr)
        // console.log(` [broadcastServer n:${wss.clients.size}] - sent ${messageStr} `);
    })

    ws.on('close', () => {
        console.log(` [broadcastServer n:${wss.clients.size}] - connection close `);
    })
})

export default broadcastServer