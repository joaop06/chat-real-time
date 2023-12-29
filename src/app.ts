import http from 'http';
import socket from 'socket.io';
import express from 'express';




const app = express();
app.use(express.static(__dirname + '/../public'))

const httpServer = http.createServer(app);
const io = socket(httpServer, {
    path: '/socket.io'
})

const clients: Array<any> = [];

io.on('connection', (client: any) => {
    console.log(`New client connected: ID ${client.id}`);
    clients.push(client);

    client.on('disconnect', () => {
        clients.splice(clients.indexOf(client), 1);
        console.log(`Client ${client.id} left`);

    })
})

httpServer.listen(5050, () => {
    console.log('Server is running on port 5050');
});