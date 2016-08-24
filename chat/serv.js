var http = require('http');
var fs = require('fs');
var express = require('express');
var session = require('cookie-session');

var app = express();

var server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.emit('get_user');
	socket.on('test', function(socket){
		console.log('test passed');
	});
	socket.on('arrivee', function(username){
		console.log('RECU');
		console.log(username.user);
	});
});


server.listen(1337);
