var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var connectedUsers = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('مستخدم متصل.');

	socket.on('disconnect', function() {
		var userData = connectedUsers[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(connectedUsers[socket.id]);
			io.to(userData.room).emit('message', {
				username: 'System',
				text: userData.username + 'ل غادر الغرفة!',
				timestamp: moment().valueOf()
			});
			delete connectedUsers[socket.id];
		}
	});

	socket.on('joinRoom', function(req, callback) {
		if (req.room.replace(/\s/g, "").length > 0 && req.username.replace(/\s/g, "").length > 0) {
			var nameTaken = false;

			Object.keys(connectedUsers).forEach(function(socketId) {
				var userInfo = connectedUsers[socketId];
				if (userInfo.username.toUpperCase() === req.username.toUpperCase()) {
					nameTaken = true;
				}
			});

			if (nameTaken) {
				callback({
					nameAvailable: false,
					error: 'عذرا اسم المستخدم هذا مأخوذ!'
				});
			} else {
				connectedUsers[socket.id] = req;
				socket.join(req.room);
				socket.broadcast.to(req.room).emit('message', {
					username: 'System',
					text: req.username + 'انضم الى الغرفة!',
					timestamp: moment().valueOf()
				});
				callback({
					nameAvailable: true
				});
			}
		} else {
			callback({
				nameAvailable: false,
				error: 'مرحبًا ، من فضلك املأ النموذج!'
			});
		}
	});

	socket.on('message', function(message) {
		message.timestamp = moment().valueOf();
		io.to(connectedUsers[socket.id].room).emit('message', message);
	});

	socket.emit('message', {
		username: 'System',
		text: 'مرحبًا يا من هناك! اطلب من شخص ما الانضمام إلى غرفة الدردشة هذه لبدء الحديث.',
		timestamp: moment().valueOf()
	});

});
io.on("connection", socket => {
  socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
});
http.listen(PORT, function() {
	console.log('بدأ الخادم في المنفذ ' + PORT);
});