var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var app            = express();

var databaseURL    = 'mongodb://localhost:27017/gigs';
mongoose.connect(databaseURL);

var routes         = require('./config/routes');

// Setup Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));
app.use(routes);

// Listen on the correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening.")