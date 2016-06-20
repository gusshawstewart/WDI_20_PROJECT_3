var User = require('../models/user');

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

// function usersFollow(req, res){
//   User.findById(req.params.id, function(err, user) {
//     if(err) return res.status(500).json({ message: err });
//     return res.status(200).json({ user: user });
//     // user.followers.push(followed_user);
//   });
// }

// function usersUnfollow(req, res){
//   User.findById(req.params.id, function(err, user) {
//     if(err) return res.status(500).json({ message: err });
//     return res.status(200).json({ user: user });

//     // user.following.splice(followed_user);
//   });
// }


module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
  // follow: userFollow,
  // unfollow: usersUnfollow
};