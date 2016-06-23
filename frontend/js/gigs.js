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

var ajax = $.get('http://localhost:3000/currentUser')
 .done(function(user){
 });
 
$.ajax({
  url:'http://localhost:3000/gigs',
  type:'get',
  data: { 
    latitude: gigInput.userLat,
    longitude: gigInput.userLng 
  }
  }).done(function(data){
    $.each(data, function(index, sortedArrayOfObjectElement){
    sortedArrayOfObjectElement.gig.distance = sortedArrayOfObjectElement.distance
    addGig(sortedArrayOfObjectElement.gig);

  });
});

}

// CREATE GIG
function createGig(){
  event.preventDefault();


// check it this works without photo. 
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
      "gig_photo" : $("#reg-gigphoto-image").data('filename')
      // UPLOAD SONG
      // "gig_track" : $("#reg-gigtrack").data('filename')
    }}
  }).done(function(data){
    console.log(data);
    addGig(data);
    $("input#gig-title").val(null),
    $("input#gig-description").val(null),
    $("input#gig-time").val(null),
    $("input#gig-cost").val(null)
  });

}

// ADD A GIG TO PAGE
function addGig(gig){

  //add marker to map
     // Clear out the old markers.
    
    var currentLatLng = {lat: gig.lat, lng: gig.lng};
    var marker = new google.maps.Marker({
            position: currentLatLng,
            map: gigInput.map
        });
    markers.push(marker);

  // add map info window
    var infowindow = new google.maps.InfoWindow({
        content: "<p>" + gig.title + "</p><hr><p>" + gig.description + "</p><hr><a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig._id + "' class='show-gig'>Show</a>"
    });

  //open info window on click
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(gigInput.map, marker);
    });


  var gigIndex =
  "<tr id='music-trigger'><td>" +
  "<ul id='gigs-side-listing'>" +
  "<li> <img src='http://localhost:3000/uploads/thumbnail/" + gig.gig_photo + "'></li>" +
  "<li>Distance:" + gig.distance + "</li>" + 
  "<li> Title: " + gig.title + "</li>" + 
  "<li> Description: " + gig.description + "</li>" +
  "<li> Cost: " + gig.cost + "</li>" +
  // "<a data-id='"+gig._id+"' class='show' href='#'>Show</a>" 
  "<a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig._id + "' class='show-gig'>Show</a>" +
  "</ul>" +
  "</tr> </td>"

  $("#gigs-side-listing").prepend(gigIndex)

  $("#music-trigger")
    .mouseenter(function() {
     marker.setIcon('images/target-marker.png')

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
   "<li> <img src='" + gig.gig_photo + "'></li>" +
   "<li>" + gig.title + "</li>" +
   "<li>" + gig.description + "</li>" +
   "<li>Date: " + gigDate + "</li>" +
   "<li>Time: " + gigTime + "</li>" +
   "<li>Cost: " + gig.cost + "</li>";


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
          $('#showgig-modal').append(gigAttending);
        }else{
          $('#showgig-modal').append(gigNotAttending);
        }
    }

    // IF OWNER, ADD EDIT AND DELETE BUTTONS
      function toggleEdit(){
        var gigOwner = gig.owner;
        var currentUser = user.currentUser._id;
          if(gigOwner == currentUser){
            $('#showgig-modal').append(gigEditDelete);
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

// <<<<<<< HEAD
// =======


// var attendGig = function(){
//   event.preventDefault();
//   var attend = ({
//     users: {
//       "attending-gigs": $(".attend-gig").val(),
//     }
//   });

//   $.ajax({
//     method: 'patch',
//     url: 'http://localhost:3000/gigs/'+$(this).data().id,
//     data: attend
//   }).done(function(data){

//     location.reload();
//   });
// }


// >>>>>>> fda897f4cd20ec58bb26d32641e5bbc04fb2e874
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
