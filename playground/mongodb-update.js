const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err)
		return console.log('Unable to connect to MongoDB server');
	console.log('Connected to MongoDB server');

	// var todos = db.collection('Todos');
	// todos.findOneAndUpdate({ _id : new ObjectID('596e0dbc6cafc11a254f9a1e')}, 
	// 	{ $set : { completed : true } },
	// 	{ returnOriginal : false })
	// .then( (res) => {
	// 	console.log(res);
	// });

	var users = db.collection('Users');
	users.findOneAndUpdate({ _id : new ObjectID('596e1e48a51ade100cea2917')},
		{ $set : { name : 'Someone'}, $inc : { age : 4 } },
		{ returnOriginal : false })
	.then( (res) => {
		console.log(res);
	});
	
	db.close();
});