var express       = require('express');
var app           = express();
var morgan        = require('morgan');
var port           = process.env.PORT || 3000;
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var routes         = require('./config/routes');

mongoose.connect('mongodb://localhost:27017/lineup');

// MIDDLEWARE
app.use(routes);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));

app.listen(port, function() {
  console.log("Express is listening on port " + port);
});




