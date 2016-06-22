var Gig  = require("../models/gig");
var authenticationController = require('../controllers/authentication');
var Gig  = require("../models/gig");
var jwtDecode = require('jwt-decode');
var jwt    = require('jsonwebtoken');
var secret = require('../config/config').secret;


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

      gigs[i].distance = distanceOfGig

      console.log("DDIII" + gigs[i].distance)
      var gigDistanceFromUser = {gig: gigs[i], distance: distanceOfGig}
      gigsToSort.push(gigDistanceFromUser);
    }

    var sorted = gigsToSort.sort(
         function(a, b) {
             return b.distance - a.distance
         }  
     ) 
    console.log(sorted);
    console.log("SOOOOORT" + sorted[0].gig);
    sorted[0].gig.distance = sorted[0].distance
    console.log("MMMMMM" + sorted[0].gig.distance)
    return  res.status(200).send(sorted);
  });


}

function gigsCreate(req, res){
 var gig = new Gig(req.body.gig);

 // var gigId = gig._id;
 // var token = req.headers.authorisation;
 // var decoded = jwtDecode(token);
 // var _id = decoded._id;
 // gig.owner = _id;

 // User.findByIdAndUpdate(_id, {$push: { owned_gigs: gigId }}, {new: true}, function(err, user) {
 // });


 gig.save(function(err, gig) {
   if (err) return res.status(500).send(err);
   console.log(gig);
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
  console.log("yo editing")
  var id = req.params.id;
  console.log("UPDATED REQ BODY IS" + req.body.gig)

  Gig.findByIdAndUpdate({ _id: id }, req.body.gig, function(err, gig){
    console.log(err);
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    res.status(200).send(gig);
  })
}

function gigsDelete(req, res){
  var id = req.params.id;
  Gig.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}


function gigsAttend(req, res){

console.log("reached attending function");
}


module.exports = {
  gigsIndex:  gigsIndex,
  gigsCreate: gigsCreate,
  gigsShow:   gigsShow,
  gigsUpdate: gigsUpdate,
  gigsDelete: gigsDelete,
  gigsAttend: gigsAttend,
}