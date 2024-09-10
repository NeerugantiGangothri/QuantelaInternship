const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve('./public')));

//creates new instance of the Socket.IO server
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  //listens the message sent by the client
  socket.on('user-message', (message) => {
    //broadcast message to all connected clients
    io.emit('message', message);  
    console.log(message);
  });
});

app.get('/', (req, res) => {
  return res.sendFile(path.resolve('./public/server.html'));
});

server.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});
