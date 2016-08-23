var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
emitter.on('msg', function(msg1, msg2){
	console.log(msg1 + '\n' + msg2);
	});
emitter.emit('msg', 'first msg', 'second msg');
