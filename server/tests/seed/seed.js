const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require ('jsonwebtoken');

var userOneId  = new ObjectID();
var userTwoId  = new ObjectID();

var todos = [{
		_id : new ObjectID(),
		text : "First todo text",
		_creator : userOneId
	}, 
	{
		_id : new ObjectID(),
		text : "Second todo text",
		_creator : userTwoId
	}];

var users = [{
		_id : userOneId,
		email : "slimane@example.com",
		password : "12345678",
		tokens : [{
			access : 'auth',
			token : jwt.sign({_id : userOneId.toHexString(), access : 'auth'}, process.env.JWT_SECRET ).toString()
		}]
		},{
		_id : userTwoId,
		email : "slimane2@example.com",
		password : "123456789",
		tokens : [{
			access : 'auth',
			token : jwt.sign({_id : userTwoId.toHexString(), access : 'auth'}, process.env.JWT_SECRET ).toString()
		}]
	}];

var populateTodos = (done) => {
	Todo.remove({})
		.then(() => {
		return Todo.insertMany(todos);
		})
		.then(() => done());
};

var populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([ userOne, userTwo ]);
	}).then(() => done());
};

module.exports = {
	todos,
	users,
	populateTodos,
	populateUsers
};