$(document).ready(function(){
  getGigs();
  // addGig(testGig2);
  // addGig(testGig2);
})
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
  console.log('creating gig');

  // console.log("THIS IS THE LOCATION:" + gigInput.location);
  // var formData = $("#new-gig").serialize();
    // formData.append("description", $("input#gig-description").val())
    // formData.append("time", $("input#gig-time").val())
    // formData.append("cost", $("input#gig-cost").val())
    // formData.append("lastName", $("input#reg-lastname").val())
    // formData.append("city", $("input#reg-city").val())
    // formData.append("country", $("select#reg-country").val())
    // formData.append("gig_photo", $('#reg-gigphoto')[0].files[0]);

// check it this works without photo. 
  $.ajax({
    url:'http://localhost:3000/gigs',
    type:'post',
    cache: false,
    data: { gig: {
      "title": $("input#gig-title").val(),
      "description": $("#gig-description").val(),
      "time": $("input#gig-time").val(),
      "cost": $("input#gig-cost").val(),
      "gig_photo" : $("#reg-gigphoto-image").data('filename')
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

  var gigIndex =
  "<tr id='music-trigger'><td>" +
  "<ul id='gigs-side-listing'>" +
  "<li> <img src='http://localhost:3000/uploads/thumbnail/" + gig.gig_photo + "'></li>" +
  "<li> Title: " + gig.title + "</li>" + 
  "<li> Description: " + gig.description + "</li>" +
  "<li> Cost: " + gig.cost + "</li>" +
  // "<a data-id='"+gig._id+"' class='show' href='#'>Show</a>" 
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
  }).done(function(data){
    // added data.gig before
    var gigShow =
    "<li> <img src='" + data.gig.gig_photo + "'></li>" +
    "<li>" + data.gig.title + "</li>" +
    "<li>" + data.gig.description + "</li>" +
    "<li>Time: " + data.gig.time + "</li>" +
    "<li>Cost: " + data.gig.cost + "</li>" +
    "<br><a data-id='" + data.gig._id + "' data-dismiss='modal' class='delete-gig' href='#'>Delete</a> |  <a href='#' data-dismiss='modal' data-toggle='modal' data-target='#editGig' class='edit-gig' data-id='"+gig._id+"'>Edit</a>" +   "<a href='#' data-dismiss='modal' data-toggle='modal' data-target='#attendGig' class='attend-gig' data-id='"+data.gig._id+"'>Attend</a> |" +
    "</div>";

    $('#showgig-modal').prepend(gigShow);
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


var attendGig = function(){
  event.preventDefault();
  var attend = ({
    users: {
      "attending-gigs": $(".attend-gig").val(),
    }
  });

  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/gigs/'+$(this).data().id,
    data: attend
  }).done(function(data){
    // not ideal
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


// var attendGig = function(){
// event.preventDefault();
// var attend({
//   "users": $("attend-gig").val(gig.attending)
// });
// $.ajax({
//     method: 'patch',
//     url: 'http://localhost:3000/gigs/'+$(this).data().id,
//     data: user
//   }).done(function(data){
//     // not ideal
//     location.reload();
//   });

// }

