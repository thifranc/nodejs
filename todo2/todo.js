var bodyparser = require('body-parser');
var express = require('express');
var session = require('cookie-session');

var app = express();
var parsed = bodyparser.urlencoded({extended: false});

//app.use(cookieSession({session: 'sercret'}));

app.use(session({secret: 'todo_secret'}));

app.use(function(req, res, next){
	if (typeof req.session.todo == 'undefined')
		req.session.todo = [];
	next();
	});

app.get('/', function(req, res){
	res.render('index.jade', {'todo': req.session.todo});
	})
.post('/add', parsed, function(req, res){
	req.session.todo.push(req.body.newTodo);
	console.log(req.body.newTodo);
	res.redirect('/');
	})
.get('/del/:id', function(req, res){
	req.session.todo.splice(req.params.id, 1);
	res.redirect('/');
	})
.get('/logout', function(req, res){
	req.session = null;
	res.redirect('/');
	})
.use(function(req, res){
	res.writeHead(404, {"Content-Type": "text/html"});
	res.end('<h1>You are lost</h1>');
	})

.listen(1337);
