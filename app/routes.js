 // app/routes.js
var Signup = require('./models/signup');
var Client = require('./models/client');
// grab the models we want

    module.exports = function(app,express) {

        // server routes ===========================================================
        // handle things like api call
        // authentication routes

        var router = express.Router();

        // middleware to use for all requests
        router.use(function(req, res, next) {
            // do logging
            console.log('Something is happening.');
            next(); // make sure we go to the next routes and don't stop here
        });

        router.route('/signups')

            .get(function(req,res){
                Signup.find(function(err,signups){
                    if(err)
                        return res.send(err);
                    return res.send(signups);
                });
            });


        router.route('/clients')
        // this is to get all the clients

            .get(function(req,res){
                Client.find(function(err,clients){
                    if(err)
                        return res.send(err);
                    return res.send(clients);
                })
            })

            .post(function(req, res){
                Client.findOne({name: req.body.name},function(err,client){
                    if(err)
                        return res.send(err);
                    if(client)
                        return res.send({id: client._id});
                    var client = new Client();      // create a new instance of the Bear model
                    client.name = req.body.name;  // set the bears name (comes from the request)
                    client.password = client.generateHash(req.body.password);
                    client.email = req.body.email;
                    // save the bear and check for errors
                    client.save(function(err) {
                        if (err)
                            return res.send(err);

                        return res.send({ message: 'Client created!', id: client._id});
                    });
                });
            });

        router.route('/clients/:client_id')

            .put(function(req,res){
                Client.findById(req.params.client_id,function(err,client){
                    if(err)
                        return res.send(err);
                    if(!client)
                        return res.send({message:'Error, no agent with that id!'});
                    if(req.body.summary)
                        client.summary = req.body.summary;
                    if(req.body.target)
                        client.target = req.body.target;
                    if(req.body.pricing)
                        client.pricing = req.body.pricing;
                    if(req.body.questions)
                        client.questions = req.body.questions;
                    if(req.body.questionDescriptions)
                        client.questionDescriptions = req.body.questionDescriptions;
                    if(req.body.faqs)
                        client.faqs = req.body.faqs;
                    if(req.body.faqAnswers)
                        client.faqAnswers = req.body.faqAnswers;
                    client.save(function(err){
                        if(err)
                            return res.send(err);
                        return res.send({message:'Client successfully updated'});
                    });
                });
            });

        // REGISTER OUR ROUTES -------------------------------
        // all of our API routes will be prefixed with /api
        app.use('/api', router);

        // frontend routes =========================================================
        // route to handle all angular requests

    };

