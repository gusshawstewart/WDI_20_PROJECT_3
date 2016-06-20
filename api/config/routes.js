var router                   = require('express').Router();
var usersController          = require('../controllers/users');
var authenticationController = require('../controllers/authentication');
var jwt                      = require('jsonwebtoken');
var secret                   = require('./config').secret;


// Middleware function here
function checkForToken(req, res, next){

  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(token, secret, function(err, user){
      if(!user) return res.status(401).json({ message: 'Invalid token'});
      req.user = user;
      next();
    })

}

// USERS
// router.get('/users', checkForToken, usersController.index);
router.get('/users', usersController.index);

router.route('/users/:id')
  .all(checkForToken)
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);

// USER FOLLOW / UNFOLLOW
router.get('/users/follow/:id');
router.get('/users/unfollow/:id');


// GIGS

var gigsController = require('../controllers/gigsController');

  router.route('/')
    .get(gigsController.gigsIndex)
   
  router.route('/gigs')
    .get(gigsController.gigsIndex)
    .post(gigsController.gigsCreate)

  router.route('/gigs/:id') 
    .get(gigsController.gigsShow)
    .patch(gigsController.gigsUpdate)
    .delete(gigsController.gigsDelete)


module.exports = router;