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