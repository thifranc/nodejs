var http = require('http');
var fs = require('fs');
var jade = require('jade');
var express = require('express');
var session = require('cookie-session');

var app = express();

var server = http.createServer(function(req, res) {
	var html = jade.renderFile('index.jade');
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.on('nouvo', function(nouvo){
		var text = ('nouvo catch ki arriv ! son blaz c : ' + nouvo.user + ' !\n');
		socket.broadcast.emit('new_user', text);
	});
	socket.on('msg', function(msg){
		socket.broadcast.emit('new_msg', {'user': msg.user, 'text': msg.text});
		console.log(msg.user + '  dit : ' + msg.text);
	});
});

server.listen(1337);
