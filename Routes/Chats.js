var express = require('express');
var chats = express.Router();
var database = require('../Database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');

chats.use(cors());

process.env.SECRET_KEY = "socketchat";

chats.use(function (req, res, next) {
    var token = req.body.token || req.headers['token'];

    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, mutatePayload) {
            if (err) {
                appData.code = 1;
                appData.message = "Token is invalid";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData.code = 1;
        appData.message = "Please send a token";
        res.status(403).json(appData);
    }
});

chats.get('/getChatHistory', function (req, res) {
    var appData = {};
    var roomId = req.body.room_id

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.code = 1;
            appData.message = "Internal Server Error!";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM messages where roomId', roomId, function (err, rows, fields) {
                if (err) {
                    appData.code = 1;
                    appData.message = "No data found";
                    res.status(200).json(appData);
                } else {
                    appData.code = 0;
                    appData.message = "Success";
                    appData.data = rows;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

var sendMessage = function sendMessage(msg) {
    var appData = {}
    const message = JSON.parse(msg);
    var messageData = {};
    var today = new Date();
    messageData.message = message.message
    messageData.roomId = message.roomId
    messageData.roomName = message.roomName
    messageData.sentById = message.sentById
    messageData.sentByName = message.sentByName
    messageData.sentOn = message.sentOn
    console.log('client__sent_message:' + msg+", message req:"+message.message+", message 2:"+messageData.message);
    console.log(" message:" + message.message)
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.code = 1;
            appData.message = "Internal Server Error!";
            console.log(appData);
        } else {
            connection.query('INSERT INTO messages SET ?', messageData, function (err, rows, fields) {
                if (!err) {
                    appData.code = 0;
                    appData.message = "Insert message to DB";
                    console.log(appData);
                } else {
                    appData.code = 1;
                    appData.message = "Error Occurred! " + err;
                    console.log(appData);
                }
            });
            connection.release();
        }
    });
};

chats.get('/sendMessage', function (req, res) {
    var appData = {};
    var message = {}
    var content = req.body.content
    var today = new Date();
    roomData.createdById = decoded.id
    roomData.createdByName = decoded.first_name + " " + decoded.last_name
    roomData.created = today

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.code = 1;
            appData.message = "Internal Server Error!";
            res.status(500).json(appData);
        } else {
            var token = req.body.token || req.headers['token'];
            var decoded = jwt.decode(token, process.env.SECRET_KEY);
            console.log("token:" + token + ",decode:" + decoded.va)

            connection.query('INSERT INTO rooms SET ?', roomData, function (err, rows, fields) {
                if (!err) {
                    connection.query("SELECT * FROM rooms WHERE name = ?", [roomData.name], function (err, rows, fields) {
                        if (err) {
                            appData.code = 1;
                            appData.message = "Error Occurred!";
                            res.status(400).json(appData);
                        } else {
                            appData.code = 0;
                            appData.message = "Create room successfully!";
                            appData.data = rows[0];
                            res.status(200).json(appData);
                        }
                    });
                } else {
                    console.log("error:" + err.sqlMessage)
                    appData.code = 1;
                    appData.message = "Error Occured! ";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = chats
module.exports.sendMessage = sendMessage