const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	email : {
		required : true,
		trim : true,
		type : String,
		minlength : 1
	}
});
var User = mongoose.model('User', userSchema);

module.exports = { User };