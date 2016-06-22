$(document).ready(function(){
  getGigs();

  })
console.log("gig.js loaded");

// GET ALL GIGS

function getGigs(){
 
$.ajax({
  url:'http://localhost:3000/gigs',
  type:'get',
  data: { 
    latitude: gigInput.userLtd,
    longitude: gigInput.userLng 
  }
  }).done(function(data){
    $.each(data, function(index, sortedArrayOfObjects){

    addGig(sortedArrayOfObjects.gig);
  });
});

  // console.log("GIGSSS" + gigInput.userPosition);
  // var ajax = $.get('http://localhost:3000/gigs')
  // .done(function(data){
  //   $.each(data, function(index, gig){
  //     addGig(gig);
  //   });
  // });

}

// CREATE GIG

function createGig(){
  event.preventDefault();
  console.log('creating gig');
  console.log("gig LAT input is" + gigInput.coordinates.lat);
  

  console.log("THIS IS THE LOCATION:" + gigInput.coordinates);
  console.log("THIS IS THE TYPE OF FILE:" + typeof gigInput.coordinates);

$.ajax({
  url:'http://localhost:3000/gigs',
  type:'post',
  data: { gig: {
    "title": $("input#gig-title").val(),
    "description": $("input#gig-description").val(),
    "lat": gigInput.coordinates.lat(), 
    "lng": gigInput.coordinates.lng(), 
    "datetime": $("input#datetimepicker2").val(),
    "cost": $("input#gig-cost").val()
  }}
}).done(function(data){
  console.log("gig input iNSIDE is"  + gigInput.coordinates);
  addGig(data);
  $("input#gig-title").val(null),
  $("input#gig-description").val(null),
  $("input#gig-time").val(null),
  $("input#gig-cost").val(null)
});

}

// ADD A GIG TO PAGE

function addGig(gig){

  var gigIndex =
  "<tr id='music-trigger'><td>" +
  "<ul id='gigs-side-listing'>" +
  "<li> <img src='" + gig.image + "'></li>" +
  "<li> Title: " + gig.title + "</li>" + 
  "<li> Description: " + gig.description + "</li>" +
  "<li> Cost: " + gig.cost + "</li>" +
  // "<a data-id='"+gig._id+"' class='show' href='#'>Show</a>" 
  "<a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig._id + "' class='show-gig'>Show</a>" + 
  "</ul>" +
  "</tr> </td>"

  $("#gigs-side-listing").prepend(gigIndex)

  // {lat: 51.506178, lng: -0.088369};

  var currentLatLng = {lat: gig.lat, lng: gig.lng};
  var marker = new google.maps.Marker({
          position: currentLatLng,
          map: gigInput.map
      });


}

// SHOW GIG

function showGig(){
  $('#showgig-modal').empty();
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/gigs/'+ $(this).data().id
  }).done(function(gig){
    var gigShow =
    "<li> <img src='" + gig.image + "'></li>" +
    "<li>" + gig.title + "</li>" +
    "<li>" + gig.description + "</li>" +
    "<li>Time: " + gig.time + "</li>" +
    "<li>Cost: " + gig.cost + "</li>" +
    "<br><a data-id='" + gig._id + "' data-dismiss='modal' class='delete-gig' href='#'>Delete</a> |  <a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a></div>" +
    "<a data-id='" + gig._id + "' data-dismiss='modal' class='attend-button' href='#'>Attend</a>"

    $('#showgig-modal').prepend(gigShow);
  });
}

// EDIT GIG

function editGig(){
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
  console.log('removing gig');
  $.ajax({
    url:'http://localhost:3000/gigs/'+ $(this).data().id,
    type:'delete'
  })

    location.reload();
  }


//ATTENDING A GIG


var attendGig = function(){
event.preventDefault();
console.log('attend gig');

$.ajax({
   type: 'post',
   url: 'http://localhost:3000/gigs/' + $(this).data().id,
 }).done(function(data){
   // not ideal
   location.reload();
 });

};







