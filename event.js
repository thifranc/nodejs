var express = require('express');
var fs = require('fs');
var jade = require('jade');
var http = require('http');

var server = http.createServer(function(req, res){

	var content = fs.readFile('./views/index.jade', 'utf8', function (err, data) {
		var fn = jade.compile(data);
		var html = fn({name: '0leg'});
		console.log(html);
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(html);
	});
});

server.listen(8080);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecteyyy !');
});
