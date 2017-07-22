const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id : 5
}
var token = jwt.sign(data, 'HelloWorld!');
console.log(token);

try {
	var decoded = jwt.verify(token, 'HelloWorld');
	console.log('decoded : ', decoded);
}catch(e){
	console.log(e.message);
}

/*
var message = 'Hello world !!';
var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);
*/