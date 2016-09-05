var express = require('express');
var session = require('express-session');

var app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded());
app.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));

app.get('/', function(req, res){
	console.log(req.cookies);
	console.log(req.session);
	req.session.login = [];

	res.cookie('bonjour', 'hello', {maxAge: 60*1000});
	res.sendFile(__dirname + '/index.html');
	})

.get('/lol', function(req, res){
	var sess = req.session;

	sess.email = 'mdrmdrmdrmdr@gmail.com';
	sess.login.push('titbite');
	sess.mdp = 'salope';
	res.redirect('/');
	})

.post('/login', function(req, res){
	console.log(req.body.login);
	req.session.login.push(req.body.login);
	res.cookie('user', req.body.login, {maxAge: 60*1000});
	res.redirect('/');
	});

app.listen(8080);
