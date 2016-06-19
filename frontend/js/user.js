$(document).ready(function(){

console.log("user.js loaded");

var testUser = 
{
email: "bob@bob",
firstname: "Bob", 
lastname: "Smith",
profile-pic: "images/user.jpeg",
city: "London",
country: "United Kingdom"
}

//check for login 
var token = window.localStorage.getItem('token');
if(token) {
 $.ajaxSetup({
   headers: {'Authorisation': 'Bearer ' + data.token }
 });
}

$('form#login').submit(function(e){
e.preventDefault();

$.post("http://localhost:3000/api/login", {
  email: $('#email').val(),
  password: $('#password').val()
 },

function(data) {
   window.localStorage.setItem('token', data.token);
   $.ajaxSetup({
     headers: { 'Authorisation': 'Bearer ' + data.token }
   });    
   });
});

 //logout
 $('#logout').click(function(){
   window.localStorage.removeItem('token');
   console.log('logged out');
 });

 // $.get("http://localhost:3000/api/users", function(users){
 //   console.log(users);
 // });


function createUser(){
event.preventDefault();

$.ajax({
  url:'http://localhost:3000/users',
  type:'post',
  data: { user: {
    "email": $("input#user-email").val(),
    "password": $("input#user-password").val(),
    "firstname": $("input#user-firstname").val(),
    "lastname": $("input#user-lastname").val(),
    "city": $("input#city").val(),
    "country": $("input#country").val()
  }}
}).done(function(data) {
  addUser(data);
  toggleUserForm();
  $("input#user-email").val(null),
  $("input#user-password").val(null),
  $("input#user-firstname").val(null),
  $("input#user-lastname").val(null),
  $("input#city").val(null),
  $("input#country").val(null)
});
}

})
