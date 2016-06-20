var Gig  = require("../models/gig");

function gigsIndex(req, res){
  console.log("hello");
  Gig.find({}, function(err, gigs) {
    if (err) return res.status(404).send(err);

    res.status(200).send(gigs);
  });
}

function gigsCreate(req, res){
  var gig = new Gig(req.body.gig);

  gig.save(function(err, gig) {
    if (err) return res.status(500).send(err);

    res.status(201).send(gig)
  })
}

function gigsShow(req, res){
  console.log("req IIIIIS:" + req.params.id);
  var id = req.params.id;
  Gig.findById(req.params.id, function(err, gig) {
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    res.status(200).send(gig);
  })
}


function gigsUpdate(req, res){
  console.log("yo editing")
  var id = req.params.id;
  console.log("UPDATED REQ BODY IS" + req.body.gig)

  Gig.findByIdAndUpdate({ _id: id }, req.body.gig, function(err, gig){
    console.log(err);
    if (err) return res.status(500).send(err);
    if (!gig) return res.status(404).send(err);

    res.status(200).send(gig);
  })
}

function gigsDelete(req, res){
  var id = req.params.id;
  Gig.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  gigsIndex:  gigsIndex,
  gigsCreate: gigsCreate,
  gigsShow:   gigsShow,
  gigsUpdate: gigsUpdate,
  gigsDelete: gigsDelete
}