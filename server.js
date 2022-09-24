var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '/public/')));
var Users = require('./Routes/Users');
app.use('/users', Users);

var Rooms = require('./Routes/Rooms')
app.use('/rooms', Rooms)

var Chats = require('./Routes/Chats')
app.use('/chats', Chats)

app.get('/', function (req, res) {
    var appData = {};
    appData.data = "Hello!";
    res.status(200).json(appData);
})

var usernames = {};
var numUserJoined = 0;

app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/public/login/" + "login.html");
});

io.on('connection', function (socket) {
    console.log('a user connected :' + socket.id);
    socket.broadcast.emit('hi');

    socket.on('disconnect', function () {
        console.log('user disconnected:' + socket.id);

        numUserJoined -= 1;
        var data = {socketId: socket.id };
        socket.broadcast.to(socket.room).emit("server__user_left", data);
    });

    socket.on('client__sent_message', function (msg) {
        const message = JSON.parse(msg);
        console.log("socket.room:" + message.roomName)
        io.in(socket.room).emit('server__sent_message', msg);
        var chats = require('./Routes/Chats')
        chats.sendMessage(msg)
    });

    socket.on('client__show_my_hand', function (username, userId, room) {
        var data = { userId: userId, username: "" + username, room: room, socketId: socket.id };
        io.in(room).emit('server__user_joined', data);
    });

    socket.on('client__login', function (username, userId, room) {
        numUserJoined += 1;
        socket.username = username + ";" + userId;
        socket.room = room;

        socket.join(room);

        console.log("Username: " + username + "," + userId + " want to connect room: " + room + ",===>" + socket.id)
        var data = { userId: userId, username: "" + username, room: room, socketId: socket.id };


        var connectedUsers = Object.keys(io.sockets.connected).map(function (socketId) {
            return { socket_id: socketId, socket_username: io.sockets.connected[socketId].username };
        });

        // test
        console.log(connectedUsers);
        console.log("data:" + socket.username);
        io.in(room).emit('server__show_your_hand_up', data);
    });

    socket.on('client__typing', function (msg) {
        //console.log('server__user_typing:' + msg);
        //var data = { username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__user_typing', msg);
    });

    socket.on('client__stop_typing', function (msg) {
        // console.log('client__stop_typing :' + msg);
        //var data = { username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__user_stop_typing', msg);
    });

    socket.on('client__add_user', function (msg) {
        console.log('client__add_user: ' + msg);
        var data = { numUsers: numUserJoined, username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__new_user_joined', data);
    });
});

http.listen(port, function () {
    console.log("Server is running on port: " + port);
});