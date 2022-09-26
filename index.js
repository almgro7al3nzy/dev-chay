const express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//console.log(express);

console.log("============== outside io ==============");

var players = [];

io.on('connection', function(socket){
    console.log(socket.id, "a user connected to server!");
    console.log(socket.rooms);
    socket.on('connect_user', (account) => {
        var player = {
            //...socket,
            id: socket.id,
            account,
            points: 0
        }

        players.push(player);

        console.log(account.username, 'is now connected to server');

        //display the players connected to server
        console.log(players);

        console.log("Connected_user: " + player.account.username);
        //io.emit('connect_user', user);
        socket.account = account;
        console.log("socket.account.username: " + socket.account.username);
        console.log("{ id: socket.id }: " + { id: socket.id } );
        console.log("{ id: socket.id }: ", { id: socket.id } );
        console.log("socket.id: " + socket.id);
        console.log("socket.account: ", socket.account);
        console.log(socket.account, " ", account)
    });
    socket.emit('connect_user', { id: socket.id });

    socket.on('disconnect', function () {
        //console.log("One of sockets disconnected from our server.")
        console.log(socket.account.username, "disconnected from server.")
    });
});

//console.log(socket);

server.listen(app.get('port'), function(){
    console.log("Server is now running...");
    console.log("Port is on", app.get('port'))
});