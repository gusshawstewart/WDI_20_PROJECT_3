var mongoose = require("mongoose");

var databaseURL = 'mongodb://localhost:27017/lineup';
mongoose.connect(databaseURL);

var Gig    = require("../models/gig");

var gig1 = new Gig({
 
 title:"Boomtown",
 description: "Monster gig for the brave",
 datetime: "11/08/2017",
 lng: '51.002002',
 lat: "-0.112223",
 cost: "3",
 owner: "Bob of Bob",
 attending: "yes"
})

gig1.save(function(err, gig) {
 if (err) return console.log(err);
 console.log("Gig saved! ", gig);
})