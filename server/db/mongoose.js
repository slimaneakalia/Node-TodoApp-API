const mongoose = require('mongoose');

var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp_m';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
	useMongoClient: true,
});

module.exports= { mongoose };