var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var bodyParsed = bodyParser.urlencoded({ extended: false});

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(session({secret: 'todo_secret'}));

app.use(function(req, res, next){
	if (typeof req.session.todo === 'undefined')
	  req.session.todo = [];
	next();
	})

.get('/', function(req, res){
	res.render('index', {title : '5445', todo: req.session.todo});
	})
.post('/add', bodyParsed, function(req, res){
	var lol = req.body.new_todo;
	req.session.todo.push(req.body.new_todo);
	res.redirect('/');
	})
.get('/logout', function(req, res){
	req.session = null;
	res.redirect('/');
	})
.get('/del/:id', function(req, res){
	req.session.todo.splice(req.params.id, 1);
	res.render('./index', {title : '55', todo : req.session.todo});
	})
.use(function(req, res, next){
	res.writeHead(404, {"Content-Type": "text/html"});
	res.end('lost');
	})

.listen(1337);
