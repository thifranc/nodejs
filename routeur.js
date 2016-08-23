var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end('root-<h1>me</h1>');
	})
.get('/vitrine', function(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end('choose to buy');
	})
.get('/lol/:joke', function(req, res){
	//res.writeHead(200, {"Content-Type": "text/html"});
	res.render('joke.ejs', {joke: req.params.joke});
	})
.use(function(req, res, next){
	res.writeHead(404, {"Content-Type": "text/html"});
	res.end('lost');
	});

app.listen(8090);
