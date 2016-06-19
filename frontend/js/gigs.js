$(document).ready(function(){

console.log("gig.js loaded");

var testGig = 
{
image: "images/test-flyer.jpeg",
title: "Test title",
description: "Test description Lorem ipsum dolor sit amet, natoque habitasse ac vulputate suspendisse pellentesque, adipiscing laoreet risus ac wisi purus dignissim, nec dictum turpis amet augue, conubia sit cras eu quam posuere", 
cost: "£7"
}


// GET ALL GIGS

addGig(testGig);

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
}


// ADD A GIG TO PAGE

function addGig(gig){

  var gigIndex =
  "<li> <img src='" + gig.image + "'></li>" +
  "<li> Title: " + gig.title + "</li>" + 
  "<li> Description: " + gig.description + "</li>" +
  "<li> Cost: " + gig.cost + "</li>" +
  "<button id='show-" + gig._id + "'>" + "Show gig</button>"

  var gig_show =
  "<li> <img src='" + gig.image + "'></li>" +
  "<li>" + gig.title + "</li>" +
  "<li>" + gig.description + "</li>" +
  "<li>Time: " + gig.time + "</li>" +
  "<li>Cost: " + gig.cost + "</li>" +

  // "<button id='edit-" + gig._id + "'>" + "Edit User</button>" +
  // "<button id='delete-" + user._id + "'>" + "Delete User</button>" +
  "</li>" 

  $("#gigs-side-listing").prepend(gigIndex)
}

})
