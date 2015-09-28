// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var clientSchema = mongoose.Schema({
	name : {type : String, default: ''},
    password: {type : String, default: ''},
    email: {type : String, default: ''},


    fromEmail: {type : String, default: ''},
    draftEmail: {type : String, default: ''},

    website: {type : String, default: ''},
    scriptURL: {type : String, default: ''},
    created: {
    	type: Date,
    	default: Date.now()
    },leads:[{
        call_id: {type: mongoose.Schema.ObjectId, ref: 'Call'},
        agent_name: {type: String, default: ''},
        notes: {type : String, default: ''},
        followed: {type : Boolean, default: false}
    }],
    summary: {type : String, default: ''},
    target: {type : String, default: ''},
    pricing: {type : String, default: ''},
    questions: {
        type : [{
            question: String, 
            description: String
        }],
        default: []
    },
    faqs:{
        type : [{
            question: String, 
            answer: String
        }], 
        default: []
    }
});

// methods ======================
// generating a hash
clientSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
clientSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Client', clientSchema);