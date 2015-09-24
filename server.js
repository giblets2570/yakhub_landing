// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var AWS 		   = require('aws-sdk');
var nodemailer     = require('nodemailer');

// configuration ===========================================

// set the view engine to ejs
app.set('view engine', 'ejs');

var Signup = require('./app/models/signup.js');

var transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: 'admin@yakhub.co.uk',
        pass: process.env.ZOHO_PASS
    }
});

console.log('SMTP Configured');

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================

require('./app/routes')(app,express); // configure our routes

app.post('/signup', function(req,res){
	var signup = new Signup();
	console
	signup.email = req.body.inputEmail;
	signup.phone = req.body.inputPhone;
	signup.save(function(err){
		if(err)
			return res.send(err);
		var text = "Yak Hub Signup,\n\n";
		text += "Email: " + req.body.inputEmail + "\n";
		text += "Phone: " + req.body.inputPhone + "\n";
		console.log(text);
		var mailOptions = {
		    from: 'Yak Hub<admin@yakhub.co.uk>', // sender address
		    to: 'tom@yakhub.co.uk, dan@yakhub.co.uk', // list of receivers
		    subject: 'Yak Hub Signup', // Subject line
		    text: text, // plaintext body
		    // html: '<b>Hello world ✔</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    return res.render('../public/index',{'message':'Thankyou! We\'ll get back to you shortly.'}); // load our public/index.html file
		});
		// return res.render('../public/index',{'message':'Thankyou!'}); // load our public/index.html file
	});
});

app.use(function(req, res) {
    res.render('../public/index',{'message':''}); // load our public/index.html file
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;

