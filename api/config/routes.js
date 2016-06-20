var express = require('express');
var router  = express.Router();

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