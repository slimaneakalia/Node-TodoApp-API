const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err)
		return console.log('Unable to connect to MongoDB server');
	console.log('Connected to MongoDB server');

	var collection = db.collection('Todos');
	collection.find({_id : new ObjectID('596e0dbc6cafc11a254f9a1e')}).toArray().then ((res) => {
		console.log('Todos');
		console.log(JSON.stringify(res, undefined, 2));
	},
	(err) => {
		console.log('Unable to fetch data : ', err);
	});

	collection.find().count().then((res) => {
		console.log(`Todos count : ${res}`);
	},
	(err) => {
		console.log('Unable to fetch data : ', err);
	});
	db.close();
});