const WebSocket = require("ws");

const wsServer = new WebSocket.Server({port:8080});

wsServer.on("connection", ws => {
    ws.room = ""
    ws.on("message", message => {
        //webSocketSendToAll(message.toString());
        console.log(`Recieved message => ${message}`);
        let msg = JSON.parse(message);
        if (msg.joinRoom) {ws.room = msg.joinRoom}
        if (msg.room) {webSocketSendToAll(JSON.stringify(msg))}
    });
    ws.send(JSON.stringify({message:"Hello! Message from the server!"}));
});

function webSocketSendToAll(message) {
    wsServer.clients.forEach(function each(client) {
        if(client.readyState === WebSocket.OPEN) {
            if(client.room === JSON.parse(message).room) {
                client.send(message);
            }
        }
    });
}