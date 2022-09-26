const express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

io.on('connection', function(socket){
    console.log(socket.id, "a user connected to server!");
    //console.log(socket);
    socket.on('connect_user', (id) => {
        console.log(id, 'is now connected to server');
        //socket.emit('connect_user', { id: socket.id });
        io.emit('connect_user', { id: socket.id });
    });

    socket.on('create_room', (room) => {
        socket.join(room);
        //io.socket.in(room).emit("a new user Create a room");
        console.log(socket.rooms);
    });

    //console.log(socket.rooms); // Set { <socket.id> }
    //socket.join("join_room1");
    //console.log(socket.rooms); // Set { <socket.id>, "room1" }
    //io.to("join_room1").emit("a new user has joined the room"); // broadcast to everyone in the room

    socket.on('disconnecting', function () {
        socket.emit('disconnect_user', { id: socket.id });
        console.log(socket.id, "disconnected from server.")
    });
});

//console.log(socket);s

server.listen(app.get('port'), function(){
    console.log("Server is now running...");
    console.log("Port is on", app.get('port'))
});