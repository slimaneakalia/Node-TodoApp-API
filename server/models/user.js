const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
			validator : function (value){
				return validator.isEmail(value);
			},
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

	var obj = { _id : user._id.toHexString(), access };
	var token = jwt.sign(obj, 'HelloWorld!');

	user.tokens.push({access, token});
	return user.save().then(() => token );
};

userSchema.methods.toJSON = function (){
	var user = this;
	var userObj = user.toObject();
	return _.pick(userObj, ['_id', 'email']);
};

userSchema.statics.findByToken = function (token){
	var User = this;
	var decoded;
	try
	{
		decoded = jwt.verify(token, 'HelloWorld!');
	}catch(e) { return Promise.reject(); }
	console.log("decoded : ", decoded);
	return User.findOne({
		'_id' : decoded._id,
		'tokens.token' : token,
		'tokens.access' : 'auth'
	});
};

userSchema.statics.findByCredentials = function (email, password){
	var user = this;
	return User.findOne({ email }).then((user) => {
		if (!user){
			console.log("HelloWorld");
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res)
					resolve(user);
				else
					reject();
			});
		});
	});
};

userSchema.pre('save', function(next){
	var user = this;
	if (user.isModified('password'))
	{
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	}
	else
		next();
});

var User = mongoose.model('User', userSchema);

module.exports = { User };