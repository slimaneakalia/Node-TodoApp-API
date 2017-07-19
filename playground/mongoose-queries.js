const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '596f5c225f5dbb086080c174';

if (!ObjectID.isValid(id))
{
	console.log ('Id not valid');
	return;
}


Todo.find({_id : id}).then((todos) => {
	console.log("Find :");
	if (!todos.length)
		console.log("Id not found");
	else
		console.log(todos);
});

Todo.findOne({_id : id}).then((todo) => {
	console.log("FindOne");
	if(!todo)
		console.log("Id not found");
	else
		console.log(todo);
});

Todo.findById(id).then((todo) => {
	console.log("FindById");
	if(!todo)
		console.log("Id not found");
	else
		console.log(todo);
});