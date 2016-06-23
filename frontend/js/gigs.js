$(document).ready(function(){
  getGigs();

});

console.log("gig.js loaded");

$('#reg-gigphoto').fileupload({
        dataType: 'json',
        done: function (e, data) {

            var file = data.result.files[0];
            
            var image = $("<img></img>").attr('src' , "http://localhost:3000/uploads/thumbnail/" + file.name);

            $("#reg-gigphoto-image").append(image);
            $("#reg-gigphoto-image").data('filename'  , file.name);
        }
    });

function getGigs(){

var token = window.localStorage.getItem('token');
  if(token) {

  var ajax = $.get('http://localhost:3000/currentUser')
   .done(function(user){
   });

}
 
$.ajax({
  url:'http://localhost:3000/gigs',
  type:'get',
  data: { 
    latitude: gigInput.userLat,
    longitude: gigInput.userLng 
  }
  }).done(function(data){
    $.each(data, function(index, sortedArrayOfObjectElement){
    // sortedArrayOfObjectElement.gig.distance = sortedArrayOfObjectElement.distance
    // addGig(sortedArrayOfObjectElement.gig);
    addGig(sortedArrayOfObjectElement);

  });
});

}

// CREATE GIG
function createGig(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/gigs',
    type:'post',
    cache: false,
    data: { gig: {
      "title": $("input#gig-title").val(),
      "description": $("#gig-description").val(),
      "lat": gigInput.coordinates.lat(), 
      "lng": gigInput.coordinates.lng(), 
      "datetime": $("input#datetimepicker2").val(),
      "cost": $("input#gig-cost").val(),
      "gig_photo" : $("#reg-gigphoto-image").data('filename'),
      "gig_track" : $("#reg-gigtrack").data('filename')
    }}
  }).done(function(data){
    console.log(data);
    addGig(data);
    $("input#gig-title").val(null),
    $("input#gig-description").val(null),
    $("input#gig-time").val(null),
    $("input#gig-cost").val(null)

    location.reload()
  });

}

// ADD A GIG TO PAGE
function addGig(gig){

  //add marker to map
     // Clear out the old markers.

    var currentLatLng = new google.maps.LatLng(gig.gig.lat, gig.gig.lng);
    
    var marker = new google.maps.Marker({
            position: currentLatLng,
            map: gigInput.map
        });
    markers.push(marker);

  // add map info window
    var infowindow = new google.maps.InfoWindow({
        content: "<p>" + gig.gig.title + "</p><hr><p>" + gig.gig.description + "</p><hr><a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig.gig._id + "' class='show-gig'>Show</a>"
    });

  //open info window on click
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(gigInput.map, marker);
    });



  var gigIndex =
  "<tr id='music-trigger'><td id='table-style'>" +
  "<ul id='gigs-side-listing'>" +
  "<li> <img src='http://localhost:3000/uploads/thumbnail/" + gig.gig_photo + "'></li>" +
  "<li>Distance: " + gig.distance + "ml</li>" + 
  "<li>Time: " + gig.gig.datetime + "</li>" + 
  "<li> Title: " + gig.gig.title + "</li>" + 
  "<li> Description: " + gig.gig.description + "</li>" +
  "<li> Cost: " + gig.cost + "</li>" +
  // "<a data-id='"+gig._id+"' class='show' href='#'>Show</a>" 
  "<a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig.gig._id + "' class='show-gig'>Show</a>" + 
  "<audio id='track" + gig.gig._id + "'<source src='audio/" + gig.gig_track + "'></source></audio>"

  $("#gigs-side-listing").prepend(gigIndex)

  var track = $("#track" + gig.gig._id);

  $("#music-trigger")
    .mouseenter(function() {
     marker.setIcon('images/target-marker.png')
     track.play()
     console.log('audio');
    });

    $("#music-trigger").mouseleave(function(){
      marker.setIcon('images/marker.png')
    });



}

// SHOW GIG
function showGig(){

 $('#showgig-modal').empty();

 $.ajax({
   method: 'GET',
   url: 'http://localhost:3000/gigs/'+ $(this).data().id
 }).done(function(gig){

   var gigDate = gig.datetime.substring(0, 10);
   var gigTime = gig.datetime.substring(11, 16);

   var gigShow =
   "<li> <div class='imageWrapper'><img class='showImage' src='http://localhost:3000/uploads/thumbnail/" + gig.gig_photo + "'></div></li>" +
   "<div class='showInfo showGig'><li>" + gig.title + "</li>" +
   "<li>" + gig.description + "</li>" +
   "<li>Date: " + gigDate + "</li>" +
   "<li>Time: " + gigTime + "</li>" +
   "<li>Cost: " + gig.cost + "</li></div>";


   var gigEditDelete =  
   "<br><a data-id='" + gig._id + "' data-dismiss='modal' class='delete-gig' href='#'>Delete</a> | "+ 
   "<a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a></div>";

   var gigAttending = 
   "<a data-id='" + gig._id + "' data-dismiss='modal' class='unattend-button buttons' href='#'>Not attending</a>";

   var gigNotAttending = 
   "<a data-id='" + gig._id + "' data-dismiss='modal' class='attend-button buttons' href='#'>Attend</a>";

   $('#showgig-modal').prepend(gigShow);

   var ajax = $.get('http://localhost:3000/currentUser')
    .done(function(user){
     // $('#showgig-modal').append("<li>USER: " + user.currentUser._id + "</li>");


    function toggleAttend(){
      var gigArray = gig.attending;
      var currentUser = user.currentUser._id
        if($.inArray(currentUser, gigArray) != -1){
          $('.showGig').append(gigAttending);
        }else{
          $('.showGig').append(gigNotAttending);
        }
    }

    // IF OWNER, ADD EDIT AND DELETE BUTTONS
      function toggleEdit(){
        var gigOwner = gig.owner;
        var currentUser = user.currentUser._id;
          if(gigOwner == currentUser){
            $('.showGig').append(gigEditDelete);
          }
      }

      toggleAttend();
      toggleEdit();
    });
 });

}

// EDIT GIG
function editGig(){

  // console.log('editing a gig');
  // console.log('EDIT PASSED IS' + $(this).data().id);

  // $('#submitGigUpdate').attr('data-id', 1111); 

  console.log('editing a gig');
  console.log('EDIT PASSED IS' + $(this).data().id);

  $('#submitGigUpdate').attr('data-id', $(this).data().id); 

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/gigs/'+$(this).data().id
  }).done(function(gig){
    $("input#edit-gig-title").val(gig.title);
    $("#edit-gig-description").html(gig.description);
    // $("input#edit-datetimepicker2").val(gig.datetime),
    $("input#edit-gig-cost").val(gig.cost);
    // $('#submitGigUpdate').data('id', $(this).data().id);
    // $('#edit-gig').on('submit', updateGig);

  });
}

//UPDATE A GIG
var updateGig = function(){
  event.preventDefault();
  var gig = {gig : {
   "title": $("input#edit-gig-title").val(),
   "description": $("#edit-gig-description").html(),
 // $("input#edit-datetimepicker2").val(gig.datetime),
 "cost": $("input#edit-gig-cost").val()
}};
$.ajax({
  method: 'patch',
  url: 'http://localhost:3000/gigs/'+$(this).data().id,
  data: gig
}).done(function(data){
  console.log('got to the done');
    // not ideal
    location.reload();
  });
}

// REMOVE GIG
function removeGig(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/gigs/'+ $(this).data().id,
    type:'delete'
  })
    location.reload();
  }


//ATTEND A GIG
var attendGig = function(){
  event.preventDefault();

  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/gigs/attend/' + $(this).data().id,
  }).done(function(data){
    location.reload();
  });

};
//UN-ATTEND A GIG
var UnAttendGig = function(){
  event.preventDefault();

  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/gigs/attend/' + $(this).data().id,
  }).done(function(data){

    location.reload();
  });
}


//TEST API CALL

function getExternalData() {
$.ajax({
  url:'http://api.bandsintown.com/events/recommended.json',
  type:'get',
  jsonp: "callback",
  dataType: "jsonp",
  data: { 
    artists: ["Skrillex"],
    // location: {lat: 51.506178, lon:-0.088369},
    location: "New York",
    format: 'json',
    app_id: "team_scheme"
  }
  }).done(function(data){
    $.each(data, function(index, data){
      console.log(data)

  });
});

}