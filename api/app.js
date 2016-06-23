var express       = require('express');
var app           = express();
var morgan        = require('morgan');
var port           = process.env.PORT || 3000;
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var routes         = require('./config/routes');
var upload = require('jquery-file-upload-middleware');


mongoose.connect('mongodb://localhost:27017/lineup');

app.use(express.static('public'));

// MIDDLEWARE
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
app.use(routes);

  // configure upload middleware for file upload
  upload.configure({
      uploadDir: __dirname + '/public/uploads',
      uploadUrl: '/uploads',
      imageVersions: {
          thumbnail: {
              width: 80,
              height: 80
          }
      }
  });


  app.use('/upload', upload.fileHandler());


app.listen(port, function() {
  console.log("Express is listening on port " + port);
});

