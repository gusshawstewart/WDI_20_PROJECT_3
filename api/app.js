var express       = require('express');
var app           = express();
var morgan        = require('morgan');
var port          = process.env.PORT || 8000;
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var router        = require('./config/routes');
var cors          = require('cors');

mongoose.connect('mongodb://localhost/bcrypt-jwt');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, function() {
  console.log("Express is listening on port " + port);
});

