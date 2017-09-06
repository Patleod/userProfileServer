const mongoose = require('mongoose');

var MONGODB_CONNECTION = "mongodb://192.168.1.37:27017/profiles";

const accountSchema = new mongoose.Schema({
	type: {
		type: String,
		default: 'account'
	},
	pid                 : String,
	email				: String,
	password			: String
});

const profileSchema = new mongoose.Schema({
	type: {
		type: String,
		default: 'profile'
	},
	email				: String,
	firstname			: String,
	lastname			:String,
	social_media			:new mongoose.Schema({
		"twitter"		: String,
		"website"		: String
	})
});
const AccountModel = mongoose.model('account', accountSchema, 'account');
const ProfileModel = mongoose.model('profile', profileSchema, 'profile');

mongoose.Promise = require('bluebird');

//mongoose.connect('mongodb://localhost/ACO', err => {
mongoose.connect(MONGODB_CONNECTION, {useMongoClient: true}, err => {
	if (err) {
		console.log("### Error connecting to MongoDB! ###"), err
	} else {
		console.log("### Successfully connected to MongoDB! ###")
	}
})

module.exports = {
	AccountModel,
	ProfileModel
}