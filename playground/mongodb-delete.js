const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err)
		return console.log('Unable to connect to MongoDB server');
	console.log('Connected to MongoDB server');
	var collection = db.collection('Users');
	//DeleteMany
	collection.deleteMany({name : "Slimane"}).then((res) => {
		var n = res.result.n;
		console.log(`${n} document(s) deleted successfuly`);
	}, (err) => { console.log("Unable to delete documents with 'Slimane' as name"); });

	collection.findOneAndDelete({_id : new ObjectID('596e1c626cafc11a254f9d3b') }).then((res) => {
		console.log("Deleted successfuly");
		console.log(JSON.stringify(res.value, undefined, 2));
	}, (err) => { console.log("Unable to delete documents with '596e1c626cafc11a254f9d3b' as id"); });
});