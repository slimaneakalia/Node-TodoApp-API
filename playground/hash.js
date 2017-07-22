const bcrypt = require('bcryptjs');

var pass = 'HelloWorld!';
bcrypt.genSalt (10, (err, salt) => {
	bcrypt.hash(pass, salt, (err, hash) => {
		console.log(hash);
	});
});

var hash = '$2a$10$GEl4.Jv8NR.Vndgs95HgXuVtZFjOVQQYnbcNhxNtVgDU7bt07e9w6';
bcrypt.compare(pass, hash, (err, res) => {
	console.log("Res : ", res);
});

// const { SHA256 } = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var data = {
// 	id : 5
// }
// var token = jwt.sign(data, 'HelloWorld!');
// console.log(token);

// try {
// 	var decoded = jwt.verify(token, 'HelloWorld');
// 	console.log('decoded : ', decoded);
// }catch(e){
// 	console.log(e.message);
// }

/*
var message = 'Hello world !!';
var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);
*/