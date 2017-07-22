require('./config/config');

const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const PORT = process.env.PORT || 300;

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

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

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if (ObjectID.isValid(id)){
		Todo.findByIdAndRemove(id).then((todo) => {
			if (todo)
				res.send({todo});
			else
				res.status(404).send();
		}).catch((e) => {
			res.status(400).send();
		});
	} else
		res.status(404).send();
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id))
		return res.status(404).send();
	if (_.isBoolean(body.completed) && body.completed)
		body.completedAt = new Date().getTime();
	else
	{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, { $set : body },{ new : true}).then((todo) => {
		if (todo)
			res.send({ todo });
		else
			res.status(404).send();
	}).catch ((e) => {
		res.status(400).send();
	})
});

app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	user.save().then(() => {
		return user.generateAuthTokens();
	})
	.then((token) => {
		res.header('x-auth', token).send(user);
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(PORT, () => {
	console.log("Server started on port : ", PORT);
});

module.exports = { app };