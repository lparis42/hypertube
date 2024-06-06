const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

process.env.PORT = 443;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = { app, server };
