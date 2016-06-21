$(document).ready(function(){

console.log("user.js loaded");

var testUser = 
{
email: "bob@bob",
firstname: "Bob", 
lastname: "Smith",
profilePic: "images/user.jpeg",
city: "London",
country: "GB"
}

// GET ALL USERS

addUser(testUser);

  // function getUsers(){
  //   var ajax = $.get('http://localhost:3000/users')
  //   .done(function(data){
  //     $.each(data, function(index, user){
  //       addUser(user);
  //     });
  //   });
  // }
})


// SHOW USER

function showUser(){
  // $.ajax({
  //   method: 'GET',
  //   url: 'http://localhost:3000/users/'+$(this).data().id
  // }).done(function(user){
  //   var userShow =
  //   "<li> <img src='" + user.profile-pic + "'></li>" +
  //   "<li>" + user.title + "</li>" +
  //   "<li>" + user.description + "</li>" +
  //   "<li>Time: " + user.time + "</li>" +
  //   "<li>Cost: " + user.cost + "</li>" +

  //   $('#showgig-modal').prepend(gigShow);
  // });
  var testUser = 
  {
  email: "bob@bob",
  firstname: "Bob", 
  lastname: "Smith",
  profilePic: "images/user.jpg",
  city: "London",
  country: "United Kingdom"
  }
  console.log('showing user');
  $('#showuser-modal').empty();
  var user = testUser;

  // var owned_gigs = 
  //   for (var i = 0; i < owned_gigs.length; i++) {
  //     console.log(owned_gigs[i]);
  // }

  console.log(user.owned_gigs);

  var element =
  "<li> <img src='" + user.profilePic + "'></li>" +
  "<li>First Name: " + user.firstname + "</li>" +
  "<li>Last Name: " + user.lastname + "</li>" +
  "<li>City: " + user.city + "</li>" +
  "<li>Country: " + user.country + "</li>" + 
  "<li>I'm attending: " + user.attending_gigs + "</li>" +
  "<li>My gigs: " + user.owned_gigs + "</li>" +
  "<br>"+
    "<a data-id='"+user._id+"' class='delete' href='#'>Delete</a> |" +
    "<a href='#' class='edit-user' data-dismiss='modal' data-toggle='modal' data-target='#edit-user' data-id='"+user._id+"'>Edit</a>"+
    "</div>";

  $('#showuser-modal').prepend(element);
}


// ADD A USER TO PAGE

function addUser(user){

  // var userIndex =
  // "<li> <img src='" + gig.image + "'></li>" +
  // "<li> Title: " + gig.title + "</li>" + 
  // "<li> Description: " + gig.description + "</li>" +
  // "<li> Cost: " + gig.cost + "</li>" +
  // "<button id='show-" + gig._id + "'>" + "Show gig</button>"

  // var user_show =
  // "<li> <img src='" + user.image + "'></li>" +
  // "<li>" + user.firstname + "</li>" +
  // "<li>" + user.lastname + "</li>" +
  // "<li>Time: " + user.time + "</li>" +
  // "<li>Cost: " + gig.cost + "</li>" +

  // "<button id='edit-" + gig._id + "'>" + "Edit User</button>" +
  // "<button id='delete-" + user._id + "'>" + "Delete User</button>" +
  // "</li>" 

  // $("#gigs-side-listing").prepend(gigIndex)
}

//check for login 

var token = window.localStorage.getItem('token');
if(token) {
 $.ajaxSetup({
   headers: {'Authorisation': 'Bearer ' + token }

 });
}


function createSession(){
event.preventDefault();
console.log('creating session' + $('#login-email').val() + $('#login-password').val());

  $.post("http://localhost:3000/login", {
    email: $('#login-email').val(),
    password: $('#login-password').val()
   }).done(function(data) {
     window.localStorage.setItem('token', data.token);
     $.ajaxSetup({
       headers: { 'Authorisation': 'Bearer ' + data.token }
     });    
  });
};

 //logout
 $('#logout').click(function(){
   window.localStorage.removeItem('token');
   console.log('logged out');
 });



function createUser(){
event.preventDefault();
console.log("creating user");
// console.log(
// $("input#reg-email").val(),
// $("input#reg-password").val(),
// $("input#reg-firstname").val(),
// $("input#reg-lastname").val(),
// $("input#reg-city").val(),
// $("select#reg-country").val()
// );

$.ajax({
  url:'http://localhost:3000/register',
  type:'post',
  data: {
    email: $("input#reg-email").val(),
    password: $("input#reg-password").val(),
    passwordConfirmation: $("input#reg-passwordconfirmation").val(),
    firstName: $("input#reg-firstname").val(),
    lastName: $("input#reg-lastname").val(),
    city: $("input#reg-city").val(),
    country: $("select#reg-country").val()
  }
}).done(function(data) {
  // addUser(data);
  console.log(data);
  $("input#reg-email").val(null),
  $("input#reg-password").val(null),
  $("input#reg-firstname").val(null),
  $("input#reg-lastname").val(null),
  $("input#reg-city").val(null),
  $("select#reg-country").val(null)
});
}

// EDIT USER

function editUser(){

  var testUser = 
  {
  email: "bob@bob",
  firstname: "Bob", 
  lastname: "Smith",
  profilePic: "images/user.jpeg",
  city: "London",
  country: "GB"
  }
  
  console.log('editing a user');
  // $.ajax({
  //   method: 'get',
  //   url: 'http://localhost:3000/gigs/'+$(this).data().id
  // }).done(function(user){

  //   $("input#edit-firstname").val(user.firstname),
  //   $("input#edit-lastname").val(user.lastname),
  //   $("input#edit-city").val(user.city),
  //   $("select#edit-country").val(user.country)
  // });
  var user = testUser;

    $("input#edit-firstname").val(user.firstname),
    $("input#edit-lastname").val(user.lastname),
    $("input#edit-city").val(user.city),
    $("select#edit-country").val(user.country)

  $('#edit-user-form').on('submit', updateUser);
}

var updateUser = function(){
  event.preventDefault();
  var user= {
 "fistname": $("input#edit-firstname").val(),
 "lastname": $("input#edit-lastname").val(),
 "city": $("input#edit-city").val(), 
 "country": $("select#edit-country").val()
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/users/'+$(this).data().id,
    data: user
  }).done(function(data){
    // not ideal
    location.reload();
  });
}



