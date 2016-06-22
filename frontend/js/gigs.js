$(document).ready(function(){
  getGigs();
  // addGig(testGig)
  })
console.log("gig.js loaded");

var testGig = 
{
image: "images/test-flyer.jpeg",
title: "Test title",
description: "Test description Lorem ipsum dolor sit amet, natoque habitasse ac vulputate suspendisse pellentesque, adipiscing laoreet risus ac wisi purus dignissim, nec dictum turpis amet augue, conubia sit cras eu quam posuere", 
cost: "£7"
}

var testGig2 = 
{
image: "images/test-flyer.jpeg",
title: "Test title2",
description: "Test description2 Lorem ipsum dolor sit amet, natoque habitasse ac vulputate suspendisse pellentesque, adipiscing laoreet risus ac wisi purus dignissim, nec dictum turpis amet augue, conubia sit cras eu quam posuere", 
cost: "£8"
}

// GET ALL GIGS

function getGigs(){
  var ajax = $.get('http://localhost:3000/gigs')
  .done(function(data){
    $.each(data, function(index, gig){
      addGig(gig);
    });
  });
}

// CREATE GIG
function createGig(){
  event.preventDefault();

$.ajax({
  url:'http://localhost:3000/gigs',
  type:'post',
  data: { gig: {
    "title": $("input#gig-title").val(),
    "description": $("input#gig-description").val(),
    "time": $("input#gig-time").val(),
    "cost": $("input#gig-cost").val()
  }}
}).done(function(data){
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
  "<a href='#' data-toggle='modal' data-target='#showGig' data-id='" + gig._id + "' class='show-gig'>Show</a>" + 
  "</ul>" +
  "</tr> </td>"

  $("#gigs-side-listing").prepend(gigIndex)
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
   "<li>" + gig._id + "</li>" +
   "<li>" + gig.description + "</li>" +
   "<li>Time: " + gig.time + "</li>" +
   "<li>Cost: " + gig.cost + "</li>";

   var gigEditDelete =  
   "<br><a data-id='" + gig._id + "' data-dismiss='modal' class='delete-gig' href='#'>Delete</a> | "+ 
   "<a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a></div>";

   var gigAttending = 
   "<a data-id='" + gig._id + "' data-dismiss='modal' class='unattend-button buttons' href='#'>Not attending</a>";

   var gigNotAttending = 
   "<a data-id='" + gig._id + "' data-dismiss='modal' class='attend-button buttons' href='#'>Attend</a>";
   // "<br><a data-id='" + gig._id + "' data-dismiss='modal' class='delete-gig' href='#'>Delete</a> |  <a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a></div>" 

   $('#showgig-modal').prepend(gigShow);

     var ajax = $.get('http://localhost:3000/currentUser')
      .done(function(user){
       $('#showgig-modal').append("<li>USER: " + user.currentUser._id + "</li>");
     
      toggleAttend();
      toggleEdit();

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

    });

 });
}


// EDIT GIG

function editGig(){
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

//ATTENDING A GIG
var attendGig = function(){
  event.preventDefault();

  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/gigs/attend/' + $(this).data().id,
  }).done(function(data){
    location.reload();
  });

};

//UN-ATTENDING A GIG
var UnAttendGig = function(){
  event.preventDefault();

  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/gigs/attend/' + $(this).data().id,
  }).done(function(data){

    location.reload();
  });

};

function getGigs(){

  var ajax = $.get('http://localhost:3000/currentUser')
   .done(function(user){
   });

  var ajax = $.get('http://localhost:3000/gigs')
  .done(function(data){
    $.each(data, function(index, gig){
      addGig(gig);
    });
  });

}


