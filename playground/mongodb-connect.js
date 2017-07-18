const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err)
		return console.log('Unable to connect to MongoDB server');
	console.log('Connected to MongoDB server');

	// var todo = { text : "Something to do", completed : false};
	// db.collection('Todos').insertOne(todo, (err, result) => {
	// 	if (err)
	// 		return console.log("Unable to insert todo : ", err);
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });
	var user = {name : "AKALIA Slimane2", age : 20, location : "Ifrane"};
	db.collection('Users').insertOne(user, (err, result) => {
		if (err)
			return console.log("Unable to insert user : ", err);
		console.log(result.ops[0]._id.getTimestamp());
	});

	db.close();
});