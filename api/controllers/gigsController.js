var authenticationController = require('../controllers/authentication');
var Gig                      = require("../models/gig");
var jwtDecode                = require('jwt-decode');
var jwt                      = require('jsonwebtoken');
var secret                   = require('../config/config').secret;
var User                     = require('../models/user');



function gigsIndex(req, res){


 function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1); 
   var a = 
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
     Math.sin(dLon/2) * Math.sin(dLon/2); 
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c; // Distance in km
   return d;
 }

 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }

 Gig.find({datetime: {$gt: Date.now()}}, function(err, gigs) {
   if(err) return res.status(500).json({ message: err });
   
   var gigsToSort = []

   for (var i = gigs.length - 1; i >= 0; i--) {
     
     var distanceOfGig = getDistanceFromLatLonInKm(req.query.latitude, req.query.longitude, gigs[i].lat, gigs[i].lng);

     // if (distanceOfGig < 4) {  

     var gigDistanceFromUser = {gig: gigs[i], distance: Math.round(distanceOfGig*2)/2}
     gigsToSort.push(gigDistanceFromUser);
   // }
   }
   var sorted = gigsToSort.sort(
        function(a, b) {
            return b.distance - a.distance
        }  
    ) 
   // keep this commented out for now
   // sorted[0].gig.distance = sorted[0].distance
   return res.status(200).send(sorted);
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

  User.findByIdAndUpdate(_id, {$push: { owned_gigs: gigId }}, {new: true}, function(err, user) {});

  gig.save(function(err, gig) {
    if (err) return res.status(500).send(err);
    res.status(201).send(gig)
  });

}

function gigsShow(req, res){

  var id = req.params.id;
  Gig.findById(req.params.id, function(err, gig) {
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    res.status(200).send(gig);
  });
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

