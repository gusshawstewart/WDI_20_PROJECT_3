var mongoose = require("mongoose");

var gigSchema = mongoose.Schema({
title: String,
description: String,
datetime: Date,
lat: Number,
lng: Number,
cost: String,
owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
attending: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
gig_photo: String,
gig_track: String

});

gigSchema.pre('remove', function(next){
    this.model('User').update(
        {owned_gigs: this._id}, 
        {$pull: {owned_gigs: this._id}}, 
        {multi: true},
        next
    );
});

gigSchema.pre('remove', function(next){
    this.model('User').update(
        {attending_gigs: this._id}, 
        {$pull: {attending_gigs: this._id}}, 
        {multi: true},
        next
    );
});


module.exports = mongoose.model('Gig', gigSchema);