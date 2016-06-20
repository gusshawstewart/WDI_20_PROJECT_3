var mongoose = require("mongoose");

var gigSchema = mongoose.Schema({
title:{ type: String},
description: String,
datetime: { type: Date},
lng: { type: String},
lat: { type: String},
cost: String
// owner: { type: String, required: true },
// attending: String
// change attending, owner, and datetime

});

// var gigSchema = mongoose.Schema({

// title:{ type: String, required: true },
// description: String,
// datetime: { type: Date, required: true },
// lng: { type: String, required: true },
// lat: { type: String, required: true },
// cost: String
// // owner: { type: String, required: true },
// // attending: String
// // change attending, owner, and datetime

// });

module.exports = mongoose.model('Gig', gigSchema);