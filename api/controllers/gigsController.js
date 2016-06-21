var authenticationController = require('../controllers/authentication');
var Gig  = require("../models/gig");
var jwtDecode = require('jwt-decode');
var jwt    = require('jsonwebtoken');
var secret = require('../config/config').secret;
var User   = require('../models/user')

function gigsIndex(req, res){

  Gig.find({}, function(err, gigs) {
    if (err) return res.status(404).send(err);
    res.status(200).send(gigs);
  });
}

// THIS WILL MAKE THE LOGGED IN USER THE OWNER
function gigsCreate(req, res){
  var gig = new Gig(req.body.gig);
  var gigId = gig._id;
  var token = req.headers.authorisation;
  var decoded = jwtDecode(token);
  var _id = decoded._id;
  gig.owner = _id;

  User.findByIdAndUpdate(_id, {$push: { owned_gigs: gigId }}, {new: true}, function(err, user) {
  });


  gig.save(function(err, gig) {
    if (err) return res.status(500).send(err);
    res.status(201).send(gig)
  });

}

function gigsShow(req, res){

 console.log("req IIIIIS:" + req.params.id);
 var id = req.params.id;
 Gig.findById(req.params.id, function(err, gig) {
   if (err) return res.status(500).send(err);
   if (!gig) return res.status(404).send(err);

   res.status(200).send(gig);
 })
}

function gigsUpdate(req, res){
  var id = req.params.id;

  console.log("req IIIIIS:" + req.params.id);
  var id = req.params.id;
  Gig.findById(req.params.id, function(err, gig) {
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    res.status(200).send(gig);
  });
}


function gigsDelete(req, res){

  var id = req.params.id;

  gig = Gig.findById({ _id: id }, function(err, gig){

    gig.remove({}, function(err) {
      if (err) return res.status(500).send(err);
      res.status(200)
    });

  });

 

// Gig.remove({ _id: id },

}

function gigsAttend(req, res){
  
  var token = req.headers.authorisation;
  var decoded = jwtDecode(token);
  var user_id = decoded._id

  Gig.findByIdAndUpdate(req.params.id, {$push: { attending: user_id }}, {new: true},
    function(err, gig) {
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);
    
    var gigId = gig.id;
    

    User.findByIdAndUpdate(user_id, {$push: { attending_gigs: gigId }}, {new: true}, function(err, user) {
      res.status(200).send(gig);
    });
  });
}

function gigsUnAttend(req, res){

  var token = req.headers.authorisation;
  var decoded = jwtDecode(token);
  var user_id = decoded._id

  Gig.findByIdAndUpdate(req.params.id, {$pull: { "attending":user_id }}, function(err, gig) {
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    var gigId = gig.id;
    

    User.findByIdAndUpdate(user_id, {$pull: { "attending_gigs":gigId }},  
         function(err) {
          console.log
          res.status(200).send(gig);
        });

  });
}

module.exports = {
  gigsIndex:  gigsIndex,
  gigsCreate: gigsCreate,
  gigsShow:   gigsShow,
  gigsUpdate: gigsUpdate,
  gigsDelete: gigsDelete,
  gigsAttend: gigsAttend,
  gigsUnAttend: gigsUnAttend
}