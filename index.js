var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var numUserJoined = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// var con = mysql.createConnection({
//     host: "mytestdb.ct63wc7mvgst.us-east-2.rds.amazonaws.com",
//     user: "root",
//     port: 3306,
//     password: "abc13579",
//     database: "root"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO customers (name, address) VALUES ('kieuthang','123456')";
    
//     con.query(sql, function (err, result,fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });
// usernames which are currently connected to the chat
var usernames = {};
var numOfUsers = {};
// rooms which are currently available in chat
var rooms = ['room1', 'room2', 'room3'];

app.get('/getRooms', function (req, res) {
    console.log('getRooms');
    var data = { rooms: rooms };
    res.send(data);
});

io.on('connection', function (socket) {
    console.log('a user connected :' + socket.id);
    socket.broadcast.emit('hi');

    socket.on('disconnect', function () {
        console.log('user disconnected:' + socket.id);

        numUserJoined -= 1;
        var data = { numUsers: numUserJoined, username: "" + socket.username };
        socket.broadcast.to(socket.room).emit("server__user_left", data);
    });

    socket.on('client__sent_message', function (msg) {
        console.log('client__sent_message:' + msg);
        var obj = JSON.parse(msg);
        var data = { username: "" + obj.username, message: "" + obj.message };
        socket.broadcast.to(socket.room).emit('server__sent_message', data);
    });

    socket.on('client__login', function (username, room) {
        console.log('user request login:' + username + ", num:" + numUserJoined + ",room:" + room);
        numUserJoined += 1;
        // store the username in the socket session for this client
        socket.username = username;

        // store the room name in the socket session for this client
        socket.room = room;
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join(room);

        var data = { numUsers: numUserJoined, username: "" + username, room: room };
        // echo to client they've connected
        socket.emit('server__join_room_welcome', data);
        // echo to room 1 that a person has connected to their room
        var data = { numUsers: numUserJoined, username: "" + username };
        socket.broadcast.to(room).emit('server__update_room', data);

        //io.emit('server__new_user_joined', data);
        con.query("SELECT * FROM customers WHERE name LIKE 'S%'", function (err, result,fields) {
            if (err) throw err;
            console.log(result);
        });

    });

    socket.on('client__typing', function (msg) {
        console.log('server__user_typing:' + msg);
        var data = { username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__user_typing', data);
    });

    socket.on('client__stop_typing', function (msg) {
        console.log('client__stop_typing :' + msg);
        var data = { username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__user_stop_typing', data);
    });

    socket.on('client__add_user', function (msg) {
        console.log('client__add_user: ' + msg);
        var data = { numUsers: numUserJoined, username: "" + msg };
        socket.broadcast.to(socket.room).emit('server__new_user_joined', data);
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});