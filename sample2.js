var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var players = [];

server.listen(3000, function(){
    console.log("Server is now running...");
});

//handshake to server side io.on "connection"
io.on('connection', function(socket){
    //console.log(socket.id, "Player Connected to Server!");
    //console.log(server);
    socket.on('user_joined', (name) => {
        var player = {
                //...socket,
                id: socket.id,
                name,
                points: 0
            }

            players.push(player);

        console.log(name, 'is now connected to server');

        console.log(players);
    });
    socket.emit('user_joined', { id: socket.id });

    socket.on("classic_room", (room) => {
        socket.join(room);
        console.log('room ID: ' + room + ' Player in room: ' + player);
    });

    socket.on('disconnect', function(){
        //remove player from local
        players = [...players.filter(player => player.id !== socket.id)];

        console.log(socket.id, "Player Disconnected to Server!");

        console.log("Player's Connected to Server Game: ", players);
    });
})