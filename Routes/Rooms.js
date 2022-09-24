var express = require('express');
var rooms = express.Router();
var database = require('../Database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');

rooms.use(cors());

process.env.SECRET_KEY = "socketchat";

rooms.use(function (req, res, next) {
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

rooms.get('/getRooms', function (req, res) {
    var appData = {};

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.code = 1;
            appData.message = "Internal Server Error!";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM rooms', function (err, rows, fields) {
                if (err) {
                    appData.code = 1;
                    appData.message = "No data found";
                    res.status(200).json(appData);
                } else {
                    appData.code = 0;
                    appData.data = rows;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

rooms.post('/addRoom', function (req, res) {
    var appData = {};
    var roomData = {};
    var name = req.body.name;
    roomData.name = name;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.code = 1;
            appData.message = "Internal Server Error!";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM rooms where BINARY name =?', name, function (err, rows, fields) {
                if (err) {
                    appData.code = 1;
                    appData.message = "No data found";
                    res.status(200).json(appData);
                } else {
                    if (rows.length > 0) {
                        appData.code = 1;
                        appData.message = "This room name already exist!";
                        res.status(200).json(appData);
                    } else {
                        var token = req.body.token || req.headers['token'];
                        var decoded = jwt.decode(token, process.env.SECRET_KEY);
                        console.log("token:" + token + ",decode:" + decoded.va)
                        var today = new Date();
                        roomData.createdById = decoded.id
                        roomData.createdByName = decoded.first_name+" "+decoded.last_name
                        roomData.created = today
                        
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
                    }
                }
            });
            connection.release();
        }
    });
});

module.exports = rooms