
var authenticationController = require('../controllers/authentication');
var Gig                      = require("../models/gig");
var jwtDecode                = require('jwt-decode');
var jwt                      = require('jsonwebtoken');
var secret                   = require('../config/config').secret;
var User                     = require('../models/user');
var multer                   = require('multer');


function usersIndex(req, res) {

  console.log(req.token);
  User.find(function(err, users) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ users: users });
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, { new: true }, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ user: user });
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

function currentUser(req, res){

  var token = req.headers.authorisation;
  var decoded = jwtDecode(token);
  var user_id = decoded._id;

  User.findById(user_id, function(err, user){
      console.log(user._id);

    return res.status(200).json({ currentUser: user });

  });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  currentUser: currentUser 
};