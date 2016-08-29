var bodyparser = require('body-parser');
var http = require('http');
var jade = require('jade');

var todo = {bonjour : 'bonjour'};

var server = http.createServer(function(req, res){
	var html = jade.renderFile('./views/index.jade');
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
	});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log(socket);
	console.log(todo);
	});

server.listen(1337);
