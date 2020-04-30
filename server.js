const express = require('express');
const app = express();
const database = require('./Modules/database-operations');
const endpoints = require('./Modules/endpoints');
//socket io
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//

const port = process.env.PORT || 8000;

endpoints(app);

app.use(express.static('public'));
app.use(express.json());

io.on('connection', (socket) => {
     socket.on('join', (username) => {
          console.log(username);
         socket.username = username;
         socket.broadcast.emit('user joined', username);
     });
 
     socket.on('new message', (message) => {
         const composedMessage = socket.username + ': ' + message;
         io.emit('send message', composedMessage);
     });
 
     socket.on('typing', () => {
         socket.broadcast.emit('is typing', socket.username);
     });
 
     socket.on('stop typing', () => {
         socket.broadcast.emit('not typing');
     });
 
     socket.on('disconnect', () => {
         console.log('User disconnected');
     });
 });

http.listen(port, () => {
     console.log('Server started on port:  ', port);
     database.initiateDatabase();
});
