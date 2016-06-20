$(document).ready(function(){
  addGig(testGig);
  addGig(testGig2);
  addGig(testGig2);
  showGig();
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

// function getGigs(){
//   var ajax = $.get('http://localhost:3000/gigs')
//   .done(function(data){
//     $.each(data, function(index, gig){
//       addGig(gig);
//     });
//   });
// }

// CREATE GIG



function createGig(){
  event.preventDefault();
  console.log('creating gig');

// $.ajax({
//   url:'http://localhost:3000/gigs',
//   type:'post',
//   data: { gig: {
//     "title": $("input#gig-title").val(),
//     "description": $("input#gig-description").val(),
//     "time": $("input#gig-time").val(),
//     "cost": $("input#gig-cost").val(),
//   }}

// }).done(function(data) {
//   addGig(data);
//   toggleUserForm();
//   $("input#gig-title").val(null),
//   $("input#gig-description").val(null),
//   $("input#gig-time").val(null),
//   $("input#gig-cost").val(null),
// });
var testInputGig = {
    "title": $("input#gig-title").val(),
    "description": $("#gig-description").val(),
    "time": $("input#datetimepicker2").val(),
    "cost": $("select#gig-cost").val(),
}
console.log(testInputGig.title + testInputGig.description + testInputGig.time + testInputGig.cost);
addGig(testInputGig);
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

  // "<button id='edit-" + gig._id + "'>" + "Edit User</button>" +
  // "<button id='delete-" + user._id + "'>" + "Delete User</button>" +

  $("#gigs-side-listing").prepend(gigIndex)
}

// REMOVE GIG

function removeGig(){
  event.preventDefault();
  // $.ajax({
  //   url:'http://localhost:3000/gigs/'+$(this).data().id,
  //   type:'delete'
  // });
  $(this).parent().remove();
}

// SHOW GIG

function showGig(){
  // $.ajax({
  //   method: 'GET',
  //   url: 'http://localhost:3000/gigs/'+$(this).data().id
  // }).done(function(gig){
  //   var gigShow =
  //   "<li> <img src='" + gig.image + "'></li>" +
  //   "<li>" + gig.title + "</li>" +
  //   "<li>" + gig.description + "</li>" +
  //   "<li>Time: " + gig.time + "</li>" +
  //   "<li>Cost: " + gig.cost + "</li>" +

  //   $('#showgig-modal').prepend(gigShow);
  // });
  console.log('showGig');
  var gig = testGig;
  var gigShow =
  "<li> <img src='" + gig.image + "'></li>" +
  "<li>" + gig.title + "</li>" +
  "<li>" + gig.description + "</li>" +
  "<li>Time: " + gig.time + "</li>" +
  "<li>Cost: " + gig.cost + "</li>" + 
  "<br><a data-id='"+gig._id+"' class='delete' href='#'>Delete</a> |  <a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a></div>";

  $('#showgig-modal').prepend(gigShow);
}

// EDIT GIG

function editGig(){
  console.log('editing a gig');
  // $.ajax({
  //   method: 'get',
  //   url: 'http://localhost:3000/gigs/'+$(this).data().id
  // }).done(function(user){
  //   $("input#edit-name").val(user.name),
  //   $("input#edit-github").val(user.github),
  //   $("input#edit-bio").val(user.bio),
  //   $("input#edit-portfolio").val(user.portfolio)
  //   $('form#edit-user').slideDown()
  // });
  var gig = testGig;

  $("input#edit-gig-title").val(gig.title),
  $("#edit-gig-description").html(gig.description),
  // $("input#edit-datetimepicker2").val(gig.datetime),
  $("input#edit-gig-cost").val(gig.cost)


  $('#edit-gig').on('submit', updateGig);
}

var updateGig = function(){
  event.preventDefault();
  var gig= {
 "title": $("input#edit-gig-title").val(gig.title),
 "description": $("#edit-gig-description").html(gig.description),
 // $("input#edit-datetimepicker2").val(gig.datetime),
 "cost": $("input#edit-gig-cost").val(gig.cost)
  };
  // $.ajax({
  //   method: 'patch',
  //   url: 'http://localhost:3000/users/'+$(this).data().id,
  //   data: user
  // }).done(function(data){
  //   // not ideal
  //   location.reload();
  // });
}

