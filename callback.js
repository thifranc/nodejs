var http = require('http');

//deux fonctions appele sur le meme listener
//elles sont donc conjointes
//on remarque que createServer (appelee 'avant') se termine avant
//decommentez pour refaire planter le code
var server = http.createServer(function(req, res){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('wehs<h1>lol</h1>');
	//res.end('ok');
	});

server.on('request', function(req, res){
	//res.write('request sent and received');
	console.log('lol');
	res.end('ok');
	});
server.listen(8090);
