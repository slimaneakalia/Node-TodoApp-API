const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	email : {
		required : true,
		trim : true,
		type : String,
		minlength : 1,
		unique : true,
		validate : {
			validator : validator.isEmail,
			message : '{VALUE} is not a valid email'
		}
	},
	password : {
		required : true,
		type : String,
		minlength : 6
	},
	tokens : [{
		access : {
			type : String,
			required : true
		},
		token : {
			type : String,
			required : true
		}
	}]
});

userSchema.methods.generateAuthTokens = function (){
	var user = this;
	var access = 'auth';

	var obj = { id : user._id.toHexString(), access };
	var token = jwt.sign(obj, 'HelloWorld!');

	user.tokens.push({access, token});
	return user.save().then(() => token );
};

userSchema.methods.toJSON = function (){
	var user = this;
	var userObj = user.toObject();
	return _.pick(userObj, ['_id', 'email']);
};

var User = mongoose.model('User', userSchema);

module.exports = { User };