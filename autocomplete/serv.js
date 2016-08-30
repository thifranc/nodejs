var fs = require('fs');
var http = require('http');
var jade = require('jade');

var server = http.createServer(function(req, res){
	var html = jade.renderFile('./index.jade');
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
	});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log('nouvelle connexion !');
	var towns;
	fs.readFile('./output.txt',  'utf8', function(err, read){
		towns = read.split('%');
		});
	socket.on('lettre', function(socket_data){
		console.log('key pressed ! search is : ' + socket_data.input);
		var out = [];
		for (i = 0; i < towns.length && out.length < 10; i++)
		{
			if (towns[i].match(socket_data.input) != null)
				out.push(towns[i]);
		}
		socket.emit('towns', {towns : out});
		});
	});
server.listen(1337);
