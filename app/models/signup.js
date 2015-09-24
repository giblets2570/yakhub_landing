// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our agent model
// module.exports allows us to pass this to other files when it is called

var yakhubSignupSchema = mongoose.Schema({
	email: String,
	phone: String,
	timeCreated: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('yakhubSignup', yakhubSignupSchema);