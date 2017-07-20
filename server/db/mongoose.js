const mongoose = require('mongoose');

var dbUrl = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
	useMongoClient: true,
});

module.exports= { mongoose };