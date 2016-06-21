var mongoose = require("mongoose");

var gigSchema = mongoose.Schema({
title:{ type: String},
description: String,
datetime: { type: Date},
lng: { type: String},
lat: { type: String},
cost: String,
owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
attending: [{type: mongoose.Schema.ObjectId, ref: 'User'}]

});

// gigSchema.pre('remove', function(next){
//   this.model('User').remove({ attending_gigs: this._id}, next);
// });

// Gig.pre('remove', function(next){
//   this.model('User').remove({ owned_gigs: this._id}, next);
// });

// Person.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ person: this._id }, next);
// });



module.exports = mongoose.model('Gig', gigSchema);