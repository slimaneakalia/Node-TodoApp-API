const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 300;

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	console.log(req.body);
	var newTodo = new Todo({text : req.body.text});
	newTodo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.listen(PORT, () => {
	console.log("Server started on port : ", PORT);
});


// newTodo.save().then((res) => {
// 	console.log('Todo saved : ', res);
// }, (err) => {
// 	console.log('Unable to save todo : ', err);
// });


// var newUser = new User({email : 'slimane'});
// newUser.save().then((res) => {
// 	console.log("User saved : ", res);
// }, (err) => {
// 	console.log('Unable to save user : ', err);
// });