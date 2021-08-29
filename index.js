const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('server started')
});

wss.on('connection', function connection(ws) {
    console.log('someone connected');
    ws.on('message', (data) => {
        console.log(data.toString());
        wss.broadcast(data);
    });
});

wss.on('listening', () => {
    console.log('listening on 8080')
});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
}