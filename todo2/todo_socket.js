var bodyparser = require('body-parser');
var http = require('http');
var jade = require('jade');

var todo = [];

var server = http.createServer(function(req, res){
	var html = jade.renderFile('./views/index.jade');
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
	});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log('connected!');
	socket.on('new_todo', function(text){
		todo.push(text.text);
		console.log(todo);
		socket.broadcast.emit('new_todo', {'todo': todo});
		});
	});

console.log('listening on 1337');
server.listen(1337);
