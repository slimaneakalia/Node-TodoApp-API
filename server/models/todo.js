const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	text : { 
		type : String,
		trim : true,
		minlength : 1,
		required : true
	},
	completed : {
		type : Boolean,
		default : false
	},
	completedAt : {
		type : Number,
		default : null
	},
	_creator : {
		type : mongoose.Schema.Types.ObjectId,
		required : true
	}
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };