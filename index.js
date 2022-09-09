const express = require('express');
const app = express();
require('dotenv').config();
const socket= require('socket.io');

const port = process.env.PORT || 1995;

// middleware
app.use(express.static('public'));

//listening to server
const server = app.listen(port, () => {
    console.log(`Server up and running on port http://localhost:${port}`);
  });

  // socket setup
  const io = socket(server);
 
  io.on('connection', (socket)=>{
      console.log('made socket connection', socket.id);
      socket.on('chat', (data)=>{
          io.sockets.emit('chat', data);
      });
      
      socket.on('typing', (data)=>{
          socket.broadcast.emit('typing', data)
      });
  
  });

