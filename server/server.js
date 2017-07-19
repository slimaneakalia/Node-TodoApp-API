const { ObjectID } = require('mongodb');
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

app.get('/todos', (req, res) => {
	Todo.find({}).then((todos) => {
		res.send(todos);
	}, (err) => {
		res.status(400).send(err);
	});
}, (err) => res.status(400).send(err));

app.get('/todos/:id', (req, res) => {
	 var id = req.params.id;
	 if (ObjectID.isValid(id)){
	 	Todo.findById(id).then((todo) => {
	 		if (todo)
	 			res.send({ todo });
	 		else
	 			res.status(404).send();
	 	}, (err) => res.status(400).send());
	 } else
	 	res.status(404).send();

}, (err) => res.status(400).send(err));

app.listen(PORT, () => {
	console.log("Server started on port : ", PORT);
});

module.exports = { app };